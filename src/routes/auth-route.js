const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
