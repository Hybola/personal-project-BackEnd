const { Menu } = require("../models");
exports.fetchMenu = async (id) => Menu.findAll({ where: (userId = id) });
exports.createMenu = async (input) => Menu.create(input);

exports.editMenu = async (value, id) =>
  Menu.update(value, { where: { id: id } });

exports.deleteMenu = async (id) => Menu.destroy({ where: { id: id } });
