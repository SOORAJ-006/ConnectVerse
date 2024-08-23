const bcrypt = require('bcrypt')
const asyncHandler = require("express-async-handler");
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

/**
 * @description User Register
 * @route POST /users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body);
    
    console.log(`username: ${username} , email : ${email} , password: ${password}`)

    if (!username) {
        res.status(400)
        throw new Error('Username is required')
    }
    if (!email) {
        res.status(400)
        throw new Error('email is required')
    }
    if (!password) {
        res.status(400)
        throw new Error('password is required')
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error('email already registered')
    } else {
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(`hashedPassword : ${hashedPassword}`);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: 'User Registration' })
    }

});


/**
 * @description User Login
 * @route POST /users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password, rememberMe } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email is required" });
        throw new Error('Email is required');
    }
    if (!password) {
        res.status(400).json({ message: "Password is required" });
        throw new Error('Password is required');
    }

    // Find the user with email in the database
    const user = await User.findOne({ email });

    // Comparing the hashed password and checking for user
    if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { username: user.username, email: user.email, id: user.id };

        // Determine token expiration based on "Remember Me" option
        const expiresIn = rememberMe ? '30d' : '15m'; // 30 days for "Remember Me", 15 minutes otherwise
        const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn });

        console.log(expiresIn);
        console.log(accessToken);     

        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Prevent JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'None', // 'None' for cross-origin cookies
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000, // Cookie expiration
        });

        res.send(' message: Login successful ');
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
        throw new Error('Invalid credentials');
    }
});


/**
 * @description Forget password
 * @route POST /users/forget-password
 * @access public
 */

const forgetPassword = asyncHandler(async (req, res) => {
    console.log('in forgot password');
    
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email is required" });
        throw new Error('Email is required');
    }

    // Find the user with email in the database
    const user = await User.findOne({ email });

    if (user) {
        // Generate a random token
        const resetToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '10m' });

        // Send email with reset link
        // const resetUrl = `${req.protocol}://${req.get('host')}/users/reset-password/${resetToken}`;
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        try {
            await transporter.sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                text: message,
            });
    
            res.status(200).json({ message: 'Reset password link sent to your email' });
        } catch (err) {
            res.status(500);
            throw new Error('Email could not be sent');
        }
    } else {
        res.status(400).json({ message: 'Email not found' });
        throw new Error('Email not found');
    }
});

/**
 * @description reset password
 * @route POST /users/reset-password
 * @access public
 */

const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        // Verify the JWT token
        const decoded = jwt.verify(resetToken, process.env.SECRET_TOKEN);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(400);
            throw new Error('Invalid token');
        }

        // Update user's password
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});


module.exports = { registerUser, loginUser, forgetPassword  ,resetPassword }
