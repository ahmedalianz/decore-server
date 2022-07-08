const productController = require("../controller/product.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

//----------------public crud operations of product -----
router.get("/getProducts", productController.getProducts);

//----------------crud operations of product controlled by admin-----
router.post("/addProduct", auth("Admin"), productController.addProduct);
router.patch(
  "/editProduct/:productId",
  auth("Admin"),
  productController.editProduct
);
router.patch(
  "/uploadImage/:productId",
  [auth("Admin"), upload.single("img")],
  productController.uploadImage
);
router.delete(
  "/deleteProduct/:productId",
  auth("Admin"),
  productController.deleteProduct
);

module.exports = router;
