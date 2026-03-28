const express = require("express")

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express()

app.use(express.json())
app.use(cookieParser());
const connectDB = require("../src/config/db");
dotenv.config();
const productRouter =require('./Routes/ProductRouter')

const AuthRouter = require("./Routes/AuthRouter")

const allowedOrigins = [
  "http://localhost:5173",
  "https://writex-frontend.vercel.app",
  "https://dekhoyoga.in"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

require("./config/db")

app.get("/",async (req,res)=>{
    return res.send('Hello World')
})
connectDB(); 
app.use('/auth',AuthRouter)
app.use('/products',productRouter) 
module.exports = app;