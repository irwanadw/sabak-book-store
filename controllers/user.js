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

    static async deleteUser(req,res){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Succes");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getUser(req,res) {
        try {
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(200).json(others);
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllUser(req,res) {
        try {
            const users = req.query.new 
            ? await User.find().sort({_id: -1}).limit(5)
            : await User.find();

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getStatusUser(req,res){
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
        try {
            const data = await User.aggregate([
                { $match: { 
                    createdAt: { $gte: lastYear }
                    } 
                    },
                {
                  $project: {
                    month: { $month: "$createdAt" },
                  },
                },
                {
                  $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                  },
                },
              ]);
           
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;