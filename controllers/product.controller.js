const Product = require('../models/Product');

class ProductController {
 async getProducts(req, res) {
   const products = await Product.find();
   if (products) {
     res.status(200).json({
       success: true,
       data: products
     })
   }
 }

 async getProduct(req, res) {
   const productID = req.params.id
   const product = await Product.findOne({_id: productID})
   if(product) {
     res.status(200).json({
       success: true,
       data: product
     });
   }
 }

 async createProduct(req, res) {
   console.log(req.body)
   const product = await new Product({
     number: +req.body.number,
     type: req.body.type,
     "arrival_date": new Date(req.body.arrival_date),
     length: +req.body.length,
     width: +req.body.width,
     height: +req.body.height,
     "v_prov": +req.body.v_prov,
     volume: +req.body.volume,
     "v_base": +req.body.v_base,
   });
   try {
     await product.save();
     const response = await Product.findOne({_id: product._id})
     res.status(200).json({
       success: true,
       data: response
    });
   } catch (err) {
     res.status(500).json({
       success: false,
       message: 'Internal error'
     });
   }
 }

  async editProduct(req, res) {
    const productID = req.params.id
    const product = await Product.updateOne({_id: productID},{$set: req.body})
    if(product) {
      res.status(200).json({
        success: true
      });
    }
  }

 async deleteProduct(req, res) {
   const productID = req.params.id
   const product = await Product.deleteOne({_id: productID})
   if(product) {
     res.status(200).json({
       success: true
     })
   }
 }
}


module.exports = new ProductController();