const router = require("express").Router();
const authRoutes = require("./authRoutes");
const merchantRoutes = require("./merchantRoutes");
const customerRoutes = require("./customerRoutes");
const authenticateJWT = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.json({ message: "Marketplace Merah Kuning Hijau is running" });
});

router.use(authRoutes);
router.use("/merchant", authenticateJWT, merchantRoutes);
router.use("/customer", authenticateJWT, customerRoutes);

module.exports = router;
