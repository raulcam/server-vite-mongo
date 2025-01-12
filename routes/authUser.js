
const express = require("express");
const {authUserController}  = require('../controllers/authController')


const authRouter = express.Router();

authRouter.post("/login", authUserController);

module.exports = authRouter;
