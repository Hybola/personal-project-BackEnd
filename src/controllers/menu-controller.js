const fs = require("fs");
const menuService = require("../services/menu-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const { config } = require("dotenv");

exports.fetchMenu = async (req, res, next) => {
  try {
    console.log("req.user.id====>> ", req.user.id);
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
    // if (!req.body.name || !req.body.price)
    //   createError("name or price is required", 400);
    const updateMenu = req.body;
    updateMenu["userId"] = +req.user.id;
    updateMenu["id"] = +req.params.menuId;
    const oldMenu = await menuService.getMenu(updateMenu.id); //หยิบตัว menu เดิมมาเพื่อเอา path ของ image
    updateMenu["image"]=oldMenu.image; //ให้ image มีค่าเท่ากับ url เดิมก่อน เผื่อกรณีไม่ได้ส่งมาใน request
    
    if (req.file) {
      const uploadResult = await uploadService.upload(req.file.path);
      const deleteResult = await uploadService.delete(oldMenu.image); //ลบไฟล์เก่าที่อยู่ใน cloudinary ออก
      updateMenu.image = uploadResult.secure_url;
    }
    const result = await menuService.editMenu(updateMenu, updateMenu.id);
    res.status(200).json({ updatedMenu: result });
  } catch (err) {
    next(err);
  } finally {
    ////====== ลบไฟล์ออกจาก local storage
    if (req.file) fs.unlinkSync(req.file.path);
  }
};
exports.deleteMenu = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const result = await menuService.deleteMenu(+menuId);
    console.log(result);
    res.status(200).json({ message: `menu id ${menuId} was deleted` });
  } catch (err) {
    next(err);
  }
};
