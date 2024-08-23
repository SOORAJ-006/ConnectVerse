import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { loginSchema, signupSchema } from "../config/formValidation";

const Login = () => {
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (signState === "Sign In") {
      setLoginFormData({
        ...loginFormData,
        [name]: type === "checkbox" ? checked : value,
      });

      console.log('Login form data:', loginFormData);

    } else {
      setSignupFormData({
        ...signupFormData,
        [name]: type === "checkbox" ? checked : value,
      });
      console.log('Signup form data:', signupFormData);
    }
  };

  const validateLoginForm = () => {
    const { error } = loginSchema.validate(loginFormData, { abortEarly: false });
  
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return false;
    }
  
    setErrors({});
    return true;
  };

  const validateSignupForm = () => {
    const { error } = signupSchema.validate(signupFormData, { abortEarly: false });
  
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return false;
    }
  
    setErrors({});
    return true;
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('DSDVCSD');
    
    // let isValid;
    // if (signState === "Sign In") {
    //   isValid = validateLoginForm();
    // } else if (signState === "Sign Up") {
    //   isValid = validateSignupForm();
    // }
  
    // if (!isValid) {
    //   return;
    // }
  
    if (signState === "Sign In") {
      axios.post('http://localhost:3001/users/login', loginFormData, { withCredentials: true })
        .then(response => {
          console.log('Login successful:', response.data);
          navigate('/dashboard');
        })
        .catch(error => {
          console.error('Error during login:', error);
        });
    } else if (signState === "Sign Up") {
      console.log('Signup form data:', signupFormData);
      axios.post("http://localhost:3001/users/register", signupFormData)
        .then((response) => {
          console.log("Registration successful:", response.data);
          setSignState("Sign In");
        })
        .catch((error) => {
          console.error("There was an error registering!", error);
        });
    }
  };
  
  return (
    
      <div className="min-h-screen bg-cover bg-center bg-black bg-opacity-80 flex flex-col items-center justify-center p-5 md:p-10">
        <h1 className="text-4xl font-bold text-white mb-8">Connectversa</h1>
  
        <div className="w-full max-w-md bg-black bg-opacity-75 rounded-lg p-8 md:p-10">
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">{signState}</h2>
          <form onSubmit={handleSubmit}>
            {signState === "Sign Up" && (
              <div className="mb-4">
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  placeholder="Your name"
                  className="w-full h-12 bg-gray-800 text-white mb-2 rounded-md px-4 py-2 focus:outline-none"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>
            )}
            <div className="mb-4">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                className="w-full h-12 bg-gray-800 text-white mb-2 rounded-md px-4 py-2 focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                className="w-full h-12 bg-gray-800 text-white mb-2 rounded-md px-4 py-2 focus:outline-none"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-red-600 text-white rounded-md text-lg font-medium mt-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {signState}
            </button>
            {signState === "Sign Up" && (
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={signupFormData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-white">Remember Me</label>
              </div>
            )}
            <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
              {signState === "Sign In" && (
                <Link to="/forgetpassword" className="hover:text-red-400">Forgot Password?</Link>
              )}
            </div>
          </form>
          <div className="mt-6 text-gray-400 text-sm text-center">
            {signState === "Sign In" ? (
              <p>
                New to Connectversa?{" "}
                <span
                  onClick={() => setSignState("Sign Up")}
                  className="text-white font-medium cursor-pointer"
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setSignState("Sign In")}
                  className="text-white font-medium cursor-pointer"
                >
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Login;
