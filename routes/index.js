const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Marketplace Merah Kuning Hijau is running" });
});

module.exports = router;
