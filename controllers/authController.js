const { Merchant, Customer } = require("../models");
const { comparePassword } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");

module.exports = class AuthenticationController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "EntityEmpty", message: "Email is required" };
      }
      if (!password) {
        throw { name: "EntityEmpty", message: "Password is required" };
      }

      const user =
        (await Merchant.findOne({ where: { email } })) ||
        (await Customer.findOne({ where: { email } }));
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }

      if (!user || !comparePassword(password, user.password)) {
        throw {
          name: "InvalidAuthorization",
          message: "Invalid email/password!",
        };
      }

      const access_token = signToken({
        id: user.id,
        role: user instanceof Merchant ? "merchant" : "customer",
      });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, role, name } = req.body;
      if (!email) {
        throw { name: "EntityEmpty", message: "Email is required" };
      }
      if (!password) {
        throw { name: "EntityEmpty", message: "Password is required" };
      }
      if (!role) {
        throw { name: "EntityEmpty", message: "Role is required" };
      }
      if (!name) {
        throw { name: "EntityEmpty", message: "Name is required" };
      }

      const user =
        (await Merchant.findOne({ where: { email } })) ||
        (await Customer.findOne({ where: { email } }));
      if (user) {
        throw { name: "BadRequest", message: "Email already registered" };
      }

      const hashedPassword = hashPassword(password);

      if (role === "merchant") {
        const merchant = await Merchant.create({
          email,
          password: hashedPassword,
          name,
        });
      } else if (role === "customer") {
        const customer = await Customer.create({
          email,
          password: hashedPassword,
          name,
        });
      }

      res
        .status(201)
        .json({
          message: `User with role "${role}" and email "${email}" created`,
        });
    } catch (error) {
      next(error);
    }
  }
};
