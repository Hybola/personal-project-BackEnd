module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(4, 2),
      },
      paymentStatus: {
        type: DataTypes.ENUM("UNPAID", "PAID"),
        allowNull: false,
      },
    },

    {
      underscored: true,
      paranoid: true,
    }
  );
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "RESTRICT",
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: { name: "orderId", allowNull: false },
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
