const { validationResult, matchedData, checkSchema, oneOf, body } = require('express-validator');
const createUserValidationSchema = require("../utils/createUserValidationSchema.js");

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user.js');


// route: POST /api/v1/user/signup
// create user 
router.post('/signup', 
    checkSchema(createUserValidationSchema),
    async (req, res) => {
    try {
        // check validation
        const expressValidationResult = validationResult(req);
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields",
                error: expressValidationResult.array()});
        }
        const validData = matchedData(req);

        // hash password
        const password = validData.password;
        const saltRounds = 10; // defines computational cost, default 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: validData.username,
            email: validData.email,
            password: passwordHash
        });
        await newUser.save(); // persist to db

        // on success
        res.status(201).json({
            message: "User created successfully",
            username: newUser.username,
            user_id: newUser._id
        });
    } catch (err) {
        if('code' in err && err.code == 11000){
            return res.status(500).send({ 
                message: "Duplicate username or email.", 
                status: 'Status 500: internal server error', 
                error: err 
            });
        }

        return res.status(500).send({ 
            message: "Signup operation failed", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
    
});

// route: POST /api/v1/user/login
// authenticate login by username/email
router.post('/login', 
    oneOf([body('username').notEmpty(), body('email').notEmpty()],
    { message: "Username or email must be provided."}),
    body('password')
        .notEmpty().withMessage('Password cannot be empty.')
        .isString().withMessage('Password must be a string.'),
    async (req, res) => {
    try {
        const expressValidationResult = validationResult(req);
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields",
                error: expressValidationResult.array()});
        }

        // extract from request body
        const {email, username, password} = matchedData(req);
        const credentials = email || username; // either email or user

        const user = await User.findOne({
            $or: [{email: credentials}, {username: credentials}] // query both fields for match
        });

        if(!user)
            return res.status(404).send({status: false, message: "User cannot be found."})

        const result = await bcrypt.compare(password, user.password); // check pw
        if (result)
            return res.status(200).send({status: true, message: `User '${user.username}' logged in successfully`}); 
        else 
            return res.status(401).send({status: false, message: "Authentication unsuccessful."}); 
 
        

    } catch (err) {
        res.status(500).send({ message: '500: internal server error', error: err });
    }

})

module.exports = router;