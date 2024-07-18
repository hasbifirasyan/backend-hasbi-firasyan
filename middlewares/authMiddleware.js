const { verifyToken } = require("../helpers/jwt");
const { Merchant, Customer } = require("../models");

module.exports = async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "Unauthenticated" };
    }

    const token = bearerToken.split(" ")[1];
    const decodedToken = verifyToken(token);

    const user =
      (await Merchant.findByPk(decodedToken.id)) ||
      (await Customer.findByPk(decodedToken.id));
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      role: decodedToken.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
