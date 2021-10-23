const Product = require("../models/Product");

class ProductController {
    static async addProduct(req, res) {
        try {
            const newProduct = new Product({
                title: req.body.title,
                desc: req.body.desc,
                img: req.body.img,
                categories: req.body.categories,
                publisher : req.body.publisher,
                author : req.body.author,
                price: req.body.price
            })
    
            const saveProduct = await newProduct.save();
            res.status(201).json(saveProduct);
            
        } catch (error) {
            res.status(500).json({message: `${error} (this is an error)`})
        }
    }

    static async editProduct(req,res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            {new: true});
            res.status(200).json({message: "Update Succes", data: updatedProduct});
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({message : "Delete Success"})
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getProduct(req,res) {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllProduct(req,res) {
        try {
            let product
            const qNew = req.query.new;
            const qCategory = req.query.category;

            if (qNew) {
                product = await Product.find().sort({createdAt: -1}).limit(1);
            } else if(qCategory){
                product = await Product.find({
                    categories : {
                        $in: [qCategory],
                    }
                })
            } else {
                product = await Product.find();
            }
            res.status(200).json(product)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductController;