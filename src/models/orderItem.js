module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: { notEmpty: true },
        },
        discount: {
          type: DataTypes.DECIMAL(4, 2),
        },
      },
    },

    {
      underscored: true,
    }
  );
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: { name: "orderId", allowNull: false },
      onDelete: "RESTRICT",
    });
    OrderItem.belongsTo(models.Menu, {
      foreignKey: { name: "menuId", allowNull: false },
      onDelete: "RESTRICT",
    });
  };
  return OrderItem;
};
