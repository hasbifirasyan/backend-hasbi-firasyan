const { verifyToken } = require("../helpers/jwt");

module.exports = async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "Unauthenticated" };
    }

    const token = bearerToken.split(" ")[1];
    const decodedToken = verifyToken(token);

    const user = await Customer.findByPk(decodedToken.id);
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
