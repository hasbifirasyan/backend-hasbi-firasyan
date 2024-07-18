module.exports = class CustomerController {
  static async createProduct(req, res, next) {
    try {
        const {name,price} = req.body;
        
    } catch (error) {
      next(error);
    }
  }
};
