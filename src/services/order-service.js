const {Order} =require('../models')
exports.fetchOrder = async (id) => Order.findAll({ where: (userId = id) });
exports.createOrder = async (input) => Order.create(input);

exports.editOrder = async (value, id) =>
  Order.update(value, { where: { id: id } });

exports.deleteOrder = async (id) => Order.destroy({ where: { id: id } });
