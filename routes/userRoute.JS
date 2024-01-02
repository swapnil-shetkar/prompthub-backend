const express = require("express");
const router = express.Router();
const { authenticateToken, isAuth, isAdmin } = require("../controllers/authController");
const { userById, read, update } = require("../controllers/userController");

router.get("/secret/:userId", authenticateToken, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.get("/profile/:userId", authenticateToken, isAuth, read);
router.put("/profile/:userId", authenticateToken, isAuth, update);

router.param("userId", userById);

module.exports = router;
