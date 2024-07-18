"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchant.hasMany(models.Product, { foreignKey: "MerchantId" });
    }
  }
  Merchant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Merchant Name is required",
          },
          notEmpty: {
            msg: "Merchant Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Merchant Email is already in use",
        },
        validate: {
          isEmail: {
            msg: "Merchant Email is invalid",
          },
          notNull: {
            msg: "Merchant Email is required",
          },
          notEmpty: {
            msg: "Merchant Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Merchant Password is required",
          },
          notEmpty: {
            msg: "Merchant Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Merchant",
    }
  );
  return Merchant;
};
