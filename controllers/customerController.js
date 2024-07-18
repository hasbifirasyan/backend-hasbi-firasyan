const { Product, CustomerProduct, Merchant } = require("../models");
module.exports = class CustomerController {
  static async getProductsList(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Merchant,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async buyProduct(req, res, next) {
    try {
      const CustomerId = req.user.id;
      if (req.user.role !== "customer") {
        throw {
          name: "BadRequest",
          message: "You are not authorized to buy products",
        };
      }
      const { quantity } = req.body;
      if (!quantity || quantity < 1) {
        throw { name: "BadRequest", message: "Quantity must be at least 1" };
      }
      const { ProductId } = req.params;

      const product = await Product.findByPk(Number(ProductId));
      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }

      const totalPrice = product.price * quantity;
      const discount = totalPrice > 50000 ? totalPrice * 0.1 : 0; // 10% discount
      const shippingCost = totalPrice > 15000 ? 0 : 15000; //assume a flat shipping cost of 15000 if not free
      const finalPrice = totalPrice - discount + shippingCost;

      await CustomerProduct.create({
        CustomerId,
        ProductId,
        quantity,
      });

      res
        .status(201)
        .json({ totalPrice, discount, shippingCost, finalPrice });
    } catch (error) {
      next(error);
    }
  }
};
