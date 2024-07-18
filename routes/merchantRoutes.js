const router = require("express").Router();
const MerchantController = require("../controllers/merchantController");

router.get("/buyers", MerchantController.getBuyers);
router.post("/products", MerchantController.createProduct);
router.put("/products/:id", MerchantController.updateProduct);

module.exports = router;
