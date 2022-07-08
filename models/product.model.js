const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    desc: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      default: "/images/product.png",
    },
  },
  { timestamps: true }
);
ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  const { createdAt, updatedAt, __v, ...others } = product;
  return others;
};

module.exports = models.Product || model("Product", ProductSchema);
