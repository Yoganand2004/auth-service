const UserSchema = require('../models/userSchema');
const jwt = require("jsonwebtoken")
const bcrypt= require("bcryptjs")

const signup =async (req, res) => {
  try{
    const {name,email,password} = req.body;
    const user = await UserSchema.findOne({email})
    if(user){
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const userSchema = new UserSchema({name,email,password})
    userSchema.password = await bcrypt.hash(password,10);
    await userSchema.save();
    return res.status(200).json({
      "Messsage": "SignUp Sucessfull",
      success: true
    })
    
  }
  catch(error){
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
      success: false
    });
  }
};

const  login = async (req, res) => {
  try{
    const {email,password} = req.body
    const user =await UserSchema.findOne({email});
    if(!user){
      return res.status(404).json({
        "Message": "User Not Found"
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token",token,)

    res.status(200).json({
      message: "Login successful",
      "name": user.name,
      token,
    });

    

  }
  catch(error){
    return res.status(409).json({
      "Message": "Login Failed",
      error
    })
  }
};

module.exports = { signup, login };