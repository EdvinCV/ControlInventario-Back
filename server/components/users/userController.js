/*
    USER CONTROLLER: Here there are the functions to manage all the endpoints of the users, also
    the functions to manage the login and logout endpoints.
*/
// Models
const db = require('../../config/dbconnection');
const User = db.users;
// Express validator
const {validationResult} = require('express-validator');
// Bcryptjs
const bcrypt = require('bcryptjs');
// JWT
const jwt = require('jsonwebtoken');


exports.getUsersController = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            ok: true,
            users
        });
    } catch(error){
        console.log(error);
    }
}

exports.registerUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    
    let {name, username, password} = req.body;

    // Find if a username o email already exists
    const usernameFound = await User.findOne({where: {username}});
    if(usernameFound){
        return res.status(400).json({
            ok: false,
            msg: "This username already exists"
        });
    }

        // Hash the password
    var salt = await bcrypt.genSalt(10);
    password = await bcrypt.hashSync(password, salt);
    // Create the user
    User.create({name, username, password})
        .then((data) => {
            const access_token = jwt.sign({user: username, name: name}, process.env.JWT_SECRET, {});
            res.status(200).json({
                ok: true,
                msg: 'User created',
                data: {
                    data,
                    access_token
                }
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                ok: false,
                message: "Thesre was an error"
            });
        })
}

exports.loginUserController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    const {username, password} = req.body;
    try {
        const user = await User.findOne({ where: {username} });
        // If the user doesn't exists
        if(!user){
            return res.status(400).json({
                ok: true,
                msg: "User or password incorrect"
            });
        }
        // Verify if the passwords match
        const valid = bcrypt.compareSync(password, user.password);
        if(!valid){
            return res.status(400).json({
                ok: true,
                msg: "User or password incorrect"
            });
        }
        // Generate a new access_token
        const access_token = jwt.sign({user: user.username}, process.env.JWT_SECRET, {});

        res.status(200).json({
            ok: true,
            msg: "Login successful",
            access_token
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "There was an error"
        });
    }
}