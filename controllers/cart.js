const Cart = require("../models/Cart");

class CartController{
    static async addCart(req,res) {
        try {
            const newCart = new Cart(req.body);
            // const newCart = new Cart({
            //     userId: req.body.userId,
            //     products: req.body.product
            // })
            const savedCart = await newCart.save();
            res.status(201).json(savedCart);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getCart(req,res) {
        try {

            const cart = await Cart.findOne({userId: req.params.userId});
            res.status(200).json(cart);
        } catch (error) {
            console.log(error,"error")
            res.status(500).json(error);
        }
    }

    static async getAllCart(req,res){
        try {
            const cart = await Cart.find();
            
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async editCart(req,res) {
        try {
            const updatedCart = await Cart.findOneAndUpdate({userId: req.params.userId},{
                $set: req.body
            },
            {new:true});
            res.status(200).json({message: "Update Success", data: updatedCart});
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteCart(req,res) {
        try {
            await Cart.findOneAndDelete({_id: req.params.cartId})
            res.status(200).json({message: "Deleted Success"})
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = CartController;