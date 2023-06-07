const { User } = require("../models");

exports.checkEmailExist = async (email) => {
  const existUser = await User.findOne({
    where: {
      email: email,
    },
  });
  return !!existUser;
};
exports.createUser = (user) => User.create(user);

// exports.getUserByEmailOrMobile = async (emailOrMobile) => {
//   const user = await userRepository.getUserByEmailOrMobile(emailOrMobile);
//   return user;
// };
