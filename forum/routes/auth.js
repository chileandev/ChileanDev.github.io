const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret"; // Cambiar a un secreto fuerte en producción

// Simular base de datos
const users = [];

// Login con API de RoVer
router.post("/login", async (req, res) => {
  const { robloxUsername } = req.body;
  if (!robloxUsername) return res.status(400).send("Username is required");

  // Llamada a la API de RoVer para verificar la cuenta
  try {
    const response = await axios.get(
      `https://verify.roblox.com/v1/users/${robloxUsername}/details`
    );
    const userData = response.data;

    // Generar token JWT
    const token = jwt.sign({ userId: userData.id, username: userData.name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Simular guardar usuario
    users.push({ id: userData.id, username: userData.name });
    res.cookie("token", token, { httpOnly: true }).send({ success: true });
  } catch (err) {
    res.status(400).send("Error authenticating with Roblox API");
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").send({ success: true });
});

module.exports = router;