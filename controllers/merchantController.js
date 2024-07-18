module.exports = class CustomerController {
    static async getListMerchant(req, res, next) {
      try {
          const {name,price} = req.body;
          
      } catch (error) {
        next(error);
      }
    }
  };
  