const { LoginValidation } = require('../Middleware/AuthValidation');
const productRoutes =  require("../Controller/ProductController")
const router = require('express').Router();
const verifyToken = require("../Middleware/Auth");

router.use("/", verifyToken, productRoutes)

module.exports = router


