const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  username: Joi.string().trim().required(),
  restaurantName: Joi.string().trim().required(),
  email: Joi.alternatives(Joi.string().email({ tlds: false })).strip(), //ไม่ต้องเอาค่าไปใส่ database
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(), //ไม่ต้องเอาค่าไปใส่ database
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
