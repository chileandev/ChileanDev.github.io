const express = require("express");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");
const path = require("path");
require("dotenv").config();

const app = express();

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/forum", authRoutes);
app.use("/forum", forumRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
console.log(require('crypto').randomBytes(32).toString('hex'));