const router = require("express").Router();
const { signup, login } = require("../Controller/AuthController");
const {signUpValidation, LoginValidation} = require("../Middleware/AuthValidation")

router.post('/login',LoginValidation,login
);
router.post('/signup',signUpValidation,signup
);


module.exports = router;


