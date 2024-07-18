"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomerProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerProduct.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CustomerId is required",
          },
          notEmpty: {
            msg: "CustomerId is required",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ProductId is required",
          },
          notEmpty: {
            msg: "ProductId is required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "quantity is required",
          },
          notEmpty: {
            msg: "quantity is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "CustomerProduct",
    }
  );
  return CustomerProduct;
};
