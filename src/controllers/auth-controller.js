const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

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
    const isUserExist = await userService.getUserByEmail(value.email);
    if (!!isUserExist) createError("email is already used แล้วครับ.", 409);

    // // #2. ===== hash password =====
    value.password = await bcryptService.hash(value.password);

    // // #3. ===== insert to users table =====
    const user = await userService.createUser(value);

    // // #4. ===== sign token and sent response =====
    const posToken = tokenService.sign({ id: user.id });
    res.status(200).json({posToken});
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    ////==#1 check ว่า มี emailOrMobile ใน database ไหม
    const user = await userService.getUserByEmail(value.email);
    if (!user) createError("Invalid credential", 400); //throw error ตรงนี้

    ////==#2 check ว่า password ตรงกับ password ที่ hash เก็บไว้ใน database ไหม
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) createError("Invalid credential", 400); //throw error ตรงนี้
    ////==# 3 response token ไปให้ front end
    const posToken = tokenService.sign({ id: user.id });
    res.status(200).json({posToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};