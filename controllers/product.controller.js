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
     product: req.body.product,
     arrival_date: req.body.arrival_date,
     number: req.body.number,
     type: req.body.type,
     length: req.body.length,
     width: req.body.width,
     height: req.body.height,
     "v_prov": req.body.v_prov,
     volume: req.body.volume,
     "v_base": req.body.v_base,
     "shipping_date": req.body.shipping_date,
     transport: req.body.transport,
     driver: req.body.driver,
     client: req.body.client,
     isShipped: req.body.isShipped,
     description: req.body.description
   });
   try {
     await product.save();
     res.status(200).json({success: true});
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