const express = require("express");
const router = express.Router();

// Middleware para verificar si el usuario está autenticado
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/forum/login");
  }
  next();
};

// Ruta principal del foro
router.get("/", requireAuth, (req, res) => {
  res.render("forum", { user: req.user });
});

module.exports = router;