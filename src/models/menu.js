module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: { notEmpty: true },
      },
      image: DataTypes.STRING,
    },

    {
      underscored: true,
      paranoid: true,
    }
  );
  Menu.associate = (models) => {
    Menu.belongsTo(models.Category, {
      foreignKey: { name: "categoryId", allowNull: false },
      onDelete: "RESTRICT",
    });
    Menu.belongsTo(models.User, {
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "CASCADE",
    });
    Menu.hasMany(models.OrderItem, {
      foreignKey: { name: "menuId", allowNull: false },
      onDelete: "RESTRICT",
    });
  };

  return Menu;
};
