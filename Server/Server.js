const express = require('express')
const connectDb = require('./config/connectdb')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

connectDb()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow cookies to be sent and received
}));

app.use(cookieParser());


app.use('/users' , require('./routes/user.route'))


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`server running at ${port}`)
})  