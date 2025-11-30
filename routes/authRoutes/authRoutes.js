const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  authMiddleware,
  checkAuth,
} = require("../../controllers/auth/authenticationController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logout);

router.get("/checkAuth", authMiddleware, checkAuth);

module.exports = router;
