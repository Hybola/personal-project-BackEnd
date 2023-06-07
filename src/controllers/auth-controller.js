const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");


const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validator");
const createError = require("../utils/create-error");
exports.register = async (req, res, next) => {
  try {
     // // #1. ===== validate =====
    const value = validateRegister(req.body);
    ////====== ตรวจสอบดูว่าค่าที่ส่งเข้ามามีอยู่ใน database แล้วหรือยัง
    const isUserExist = await userService.checkEmaiExist(value.email);
    if (isUserExist)
      createError("email is already used.", 409);

    // // #2. ===== hash password =====
    value.password = await bcryptService.hash(value.password);

    // // #3. ===== insert to users table =====
    const user = await userService.createUser(value);

    // // #4. ===== sign token and sent response =====
    // const accessToken = tokenService.sign({ id: user.id });
    // res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
  