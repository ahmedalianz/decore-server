const productModel = require("../models/product.model");
const successHandler = require("../helpers/successHandler");
const errorHandler = require("../helpers/errorHandler");
class Product {
  static addProduct = async (req, res) => {
    try {
      const product = await productModel.create(req.body);

      successHandler(product, res, "Product added successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static editProduct = async (req, res) => {
    try {
      let product = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body
      );
      if (!product) throw new Error("product not found");
      successHandler(product, res, " product is edited successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      let product = await productModel.findByIdAndDelete(req.params.productId);
      if (!product) throw new Error("product not found");
      successHandler(null, res, " product is deleted successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static getProducts = async (req, res) => {
    try {
      let products = await productModel.find();
      successHandler(products, res, "all Products shown successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static uploadImage = async (req, res) => {
    try {
      let productObject = await productModel.findById(req.params.productId);
      if (req.file) {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            image: "uploads/" + req.user._id + "/" + req.file.filename,
          },
        });
      } else {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            image: "uploads/" + "product.jpg",
          },
        });
        fs.unlinkSync(productObject.image, (err) => {
          if (err) throw err;
        });
      }
      successHandler(null, res, "image uploaded successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
}

module.exports = Product;
