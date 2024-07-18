"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, {
        through: "CustomerProducts",
        foreignKey: "CustomerId",
      });
    }
  }
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Customer Name is required",
          },
          notEmpty: {
            msg: "Customer Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Customer Email is already in use",
        },
        validate: {
          isEmail: {
            msg: "Customer Email is invalid",
          },
          notNull: {
            msg: "Customer Email is required",
          },
          notEmpty: {
            msg: "Customer Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Customer Password is required",
          },
          notEmpty: {
            msg: "Customer Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
