const express = require("express");
const menuController = require("../controllers/menu-controller");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/", menuController.fetchMenu);
router.post("/create", upload.single("image"), menuController.createMenu);
router.patch("/:menuId", menuController.editMenu);
router.delete("/:menuId", menuController.deleteMenu);

module.exports = router;
