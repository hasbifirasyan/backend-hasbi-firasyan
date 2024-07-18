const router = require("express").Router();
const authenticateJWT = require("../middlewares/authMiddleware");
const MerchantController = require("../controllers/merchantController");

router.get('/buyers', authenticateJWT,MerchantController.getBuyers);
router.post('/products', authenticateJWT,MerchantController.createProduct);
router.put('/products/:id', authenticateJWT,MerchantController.updateProduct);

module.exports = router;