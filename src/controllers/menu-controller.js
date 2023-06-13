const fs = require("fs");
const menuService = require("../services/menu-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");

exports.fetchMenu = async (req, res, next) => {
  try {
    const allMenu = await menuService.fetchMenu(req.user.id);
    res.status(200).json({ allMenu });
  } catch (err) {
    next(err);
  }
};
exports.createMenu = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price)
      createError("name or price is required", 400);
    const newMenu = req.body;
    newMenu["userId"] = req.user.id;
    newMenu["categoryId"] = +newMenu.categoryId;
    console.log("req.file ครับ ", req.file);
    if (req.file) {
      const uploadResult = await uploadService.upload(req.file.path);

      ////result คือ object ที่ return มาจาก cloudindary
      //// สิ่งที่สนในใน result คือ result.secure_url
      newMenu.image = uploadResult.secure_url;
    }
    const result = await menuService.createMenu(newMenu);
    // console.log("result after insert data", result);
    res.status(200).json({ newMenu: result });
  } catch (err) {
    next(err);
  } finally {
    ////====== ลบไฟล์ออกจาก local storage
    if (req.file) fs.unlinkSync(req.file.path);
  }
};
exports.editMenu = async (req, res, next) => {
  try {
    const setMenu = req.body;
    setMenu["userId"] = req.user.id;
    const { menuId } = req.params;

    const result = await menuService.editMenu(setMenu, menuId);
    res.status(200).json({ newMenu: result });
  } catch (err) {
    next(err);
  }
};
exports.deleteMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const result = await menuService.deleteMenu(+menuId);
    res.status(200).json({ message: "The menu was deleted" });
  } catch (err) {
    next(err);
  }
};
