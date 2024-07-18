const router = require("express").Router();
const authRoutes = require("./authRoutes");
const merchantRoutes = require("./merchantRoutes");

router.get("/", (req, res) => {
  res.json({ message: "Marketplace Merah Kuning Hijau is running" });
});

router.use(authRoutes)
router.use('/merchant', (req, res) => {
    res.json({ message: "Merchant routes" });
});

module.exports = router;
