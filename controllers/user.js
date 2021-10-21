const User = require("../models/User");
const bcrypt = require('bcrypt');


class UserController {
    static async editUser(req,res,) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            {new:true});

            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;