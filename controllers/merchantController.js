const e = require("express");
const { Product, Customer } = require("../models");
module.exports = class MerchantController {
  static async getBuyers(req, res, next) {
    try {
      if (req.user.role !== "merchant") {
        throw {
          name: "InvalidAuthorization",
          message: "You are not authorized",
        };
      }
      const merchantId = req.user.id;

      const buyers = await Customer.findAll({
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Product,
            where: { merchantId },
            through: { attributes: ["quantity"] },
          },
        ],
      });

      res.status(200).json(buyers);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      if (req.user.role !== "merchant") {
        throw {
          name: "InvalidAuthorization",
          message: "You are not authorized",
        };
      }
      const MerchantId = req.user.id;
      const { name, price } = req.body;

      const product = await Product.create({
        name,
        price,
        MerchantId,
      });
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      if (!name || !price) {
        throw {
          name: "BadRequest",
          message: "Name and price are required to update the product",
        };
      }

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }

      if (req.user.role !== "merchant" && req.user.id !== product.MerchantId) {
        throw {
          name: "InvalidAuthorization",
          message: "You are not authorized",
        };
      }
      await product.update({ name, price });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
};
