const menuService = require("../services/menu-service");
exports.fetchMenu = async (req, res, next) => {
  try {
    const menuList = await menuService.fetchMenu(req.user.id);
    res.status(200).json({ menuList });
  } catch (err) {
    next(err);
  }
};
exports.createMenu = async (req, res, next) => {
  try {
    const newMenu = req.body;
    
    newMenu["userId"] = req.user.id;
    newMenu['categoryId']=+newMenu.categoryId;
    console.log("kkkkkkkkkkk",newMenu)
    await menuService.createMenu(newMenu);

    res.status(200).json({ message: "new menu is created" });
  } catch (err) {
    next(err);
  }
};
exports.editMenu = async (req, res, next) => {
  try {
    const setMenu = req.body;
    setMenu["userId"] = req.user.id;
    const {menuId}=req.params;

    await menuService.editMenu(setMenu,menuId)
    res.status(200).json({ message: "menu is updated" });
  } catch (err) {
    next(err);
  }
};
exports.deleteMenu = async (req, res, next) => {
  try {
    const  {menuId} = req.params
    const result = await menuService.deleteMenu(+menuId)
    res.status(200).json( result );
  } catch (err) {
    next(err);
  }
};
