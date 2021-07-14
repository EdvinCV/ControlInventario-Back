const express = require('express');
const userRouter = express.Router();
// Express Validator
const {body} = require('express-validator');
// Controllers
const {getUsersController, loginUserController, registerUserController} = require('./userController');

userRouter
    .get('/', getUsersController)
    .post('/', registerUserController)
    .post('/login', [
            body('username').not().isEmpty(),
            body('password').not().isEmpty()
        ],
        loginUserController)

module.exports = userRouter;