const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const axios = require("axios");

const router = express.Router();

// Configura la sesión
router.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

// Configura Passport para OAuth2
passport.use(new OAuth2Strategy({
    authorizationURL: "https://apis.roblox.com/oauth/authorize",
    tokenURL: "https://apis.roblox.com/oauth/token",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Llamada a la API de Roblox para obtener el perfil del usuario
      const response = await axios.get("https://apis.roblox.com/users/v1/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const user = response.data;
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Serialización de usuario
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.use(passport.initialize());
router.use(passport.session());

// Ruta de Login con Roblox
router.get("/login", passport.authenticate("oauth2"));

// Callback después de la autenticación
router.get("/callback", passport.authenticate("oauth2", {
  failureRedirect: "/forum/login",
}), (req, res) => {
  res.redirect("/forum");
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/forum/login");
  });
});

module.exports = router;
