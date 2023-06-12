const { User } = require("../models");

exports.getUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};
exports.createUser = async (user) => User.create(user);

exports.getUserById=async(userId)=>User.findByPk(userId)

////==== below code result in "jwt malformed" response
// exports.getUserById = async (userId) =>
//   User.findOne({
//     where: { id: userId },
//     attributes: { exclude: ["password"] },
//   });