const express = require("express");
const router = express.Router();

const {create, categoryId, read, update, remove, list} = require("../controllers/categoryController");
const { authenticateToken, isAuth, isAdmin } = require("../controllers/authController");
const { userById } = require("../controllers/userController");

router.post("/create/:userId", authenticateToken, isAuth, isAdmin, create);
router.get("/show/:categoryId", read);
router.put("/update/:categoryId/:userId", authenticateToken, isAuth, isAdmin, update);
router.delete("/delete/:categoryId/:userId", authenticateToken, isAuth, isAdmin, remove);
router.get("/list", list);

router.param("userId", userById);
router.param("categoryId", categoryId);

module.exports = router;