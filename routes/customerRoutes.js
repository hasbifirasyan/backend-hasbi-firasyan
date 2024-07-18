const router = require("express").Router();
const CustomerController = require("../controllers/customerController");

router.get("/products", CustomerController.getProductsList);
router.post("/products/:ProductId/buy", CustomerController.buyProduct);

module.exports = router;
