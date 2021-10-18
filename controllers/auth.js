const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {v4 : uuidv4} = require('uuid');
const secretPass = uuidv4();


class AuthController {
    static async register(req,res) {
        try {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, JSON.stringify({secretPass})).toString()
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
            const secretKey = user.password.split("/")
            console.log(secretKey[1])
            // const userPass = user.password.split("/");
            // console.log(userPass[0],userPass[1], "INI USER")
            !user && res.status(401).json("Wrong Credentials");
            const hashPassword = CryptoJS.AES.decrypt(
                user.password
            )
            
            const password =  hashPassword.toString(CryptoJS.enc.Utf8);
            password !== req.body.password && res.status(401).json("Wrong password")
            
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: `${error} this is an error`});
        }
    }
}

module.exports = AuthController;