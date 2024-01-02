const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
} = require("../controllers/productController");
const { authenticateToken, isAuth, isAdmin } = require("../controllers/authController");
const { userById } = require("../controllers/userController");

//midleware
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname,'public')));
var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

router.post("/create/:userId", authenticateToken, isAuth, isAdmin, uploader.single("file"), create);
router.get("/show/:productId", read);
router.delete("/delete/:productId/:userId", authenticateToken, isAuth, isAdmin, remove);
router.put("/update/:productId/:userId", authenticateToken, isAuth, isAdmin, uploader.single("file"), update);

router.get("/list", list);
router.get("/related/:productId", listRelated);
router.get("/categories", listCategories);
router.post("/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;