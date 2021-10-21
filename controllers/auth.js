const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {v4 : uuidv4} = require('uuid');
const secretKey = uuidv4();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



class AuthController {
    static async register(req,res) {
        try {
            
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
                // password: CryptoJS.AES.encrypt(req.body.password, JSON.stringify({secretPass})).toString()
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        } catch (error) {
            res.status(500).json({message: `${error} (this is an error)` });
        }
    }

    static async login(req,res) {
        try {
            const user = await User.findOne({
                username: req.body.username
            })
            !user && res.status(401).json("Wrong Credentials");

            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            
            const accesToken = jwt.sign({
                id: user._id,
                isAdmin:  user.isAdmin
            },
            process.env.SECRET_KEY,
            {expiresIn: "1d"}
            )
            
            const{ password, ...others} = user._doc;
            isPasswordMatch == true ? res.status(200).json({...others, accesToken}) : res.status(401).json("Wrong password"); 

        } catch (error) {
            console.log(error)
            res.status(500).json({message: `${error} this is an error`});
        }
    }
}

module.exports = AuthController;

