const menuService = require("../services/order-service");
exports.fetchOrders = async (req, res, next) => {
  try {
    const menuList = await menuService.fetchMenu(req.user.id);
    res.status(200).json({ menuList });
  } catch (err) {
    next(err);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const newMenu = req.body;
    
    newMenu["userId"] = req.user.id;
    newMenu['categoryId']=+newMenu.categoryId;
    await menuService.createMenu(newMenu);

    res.status(200).json({ message: "new menu is created" });
  } catch (err) {
    next(err);
  }
};
exports.editOrder = async (req, res, next) => {
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
exports.deleteOrder = async (req, res, next) => {
  try {
   
    res.status(200).json( result );
  } catch (err) {
    next(err);
  }
};
