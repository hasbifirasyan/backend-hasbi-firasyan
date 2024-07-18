"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends sequelize.Sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Association with Merchant
      Product.belongsTo(models.Merchant, { foreignKey: "MerchantId", onDelete: "CASCADE", onUpdate: "CASCADE" });
      
      // Association with Customer through CustomerProducts
      Product.belongsToMany(models.Customer, {
        through: "CustomerProducts",
        foreignKey: "ProductId",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product Name is required",
          },
          notEmpty: {
            msg: "Product Name is required",
          },
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notNull: {
            msg: "Product Price is required",
          },
          notEmpty: {
            msg: "Product Price is required",
          },
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      MerchantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "MerchantId is required",
          },
          notEmpty: {
            msg: "MerchantId is required",
          },
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
