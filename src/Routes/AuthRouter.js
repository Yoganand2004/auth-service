const router = require("express").Router();

const { signup, login ,logout} = require("../Controller/AuthController");
const {signUpValidation, LoginValidation} = require("../Middleware/AuthValidation")

router.post('/login',LoginValidation,login);
router.post('/signup',signUpValidation,signup);
router.post('/logout',logout)

module.exports = router;


