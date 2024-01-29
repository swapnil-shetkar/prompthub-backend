const express = require("express");
const router = express.Router();

const { authenticateToken, isAuth } = require("../controllers/authController");
const { userById } = require("../controllers/userController");
const { generateToken, processPayment } = require("../controllers/braintreeController");

router.get("/getToken/:userId", authenticateToken, isAuth, generateToken);
router.post(
    "/payment/:userId",
    authenticateToken,
    isAuth,
    processPayment
);

router.param("userId", userById);

module.exports = router;
