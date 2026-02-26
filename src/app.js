const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(cors())
const connectDB = require("../src/config/db");
dotenv.config();


const AuthRouter = require("./Routes/AuthRouter")

require("./config/db")

app.get("/",async (req,res)=>{
    return res.send("Hello User")
})
app.use(express.json());   
connectDB(); 
app.use('/auth',AuthRouter)
app.use('/products',AuthRouter)
module.exports = app;