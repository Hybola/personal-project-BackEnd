const express = require("express");
const menuController = require("../controllers/menu-controller");
const router = express.Router();

router.get("/", menuController.fetchMenu);
router.post("/create", menuController.createMenu);
router.patch("/:menuId", menuController.editMenu);
router.delete("/:menuId", menuController.deleteMenu);

module.exports = router;
