module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "Category",
      {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
      },
  
      {
        underscored: true,
        paranoid: true,
      }
    );
    Category.associate = (models) => {
      Category.belongsTo(models.User, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "RESTRICT",
      });
      Category.hasMany(models.Menu, {
        foreignKey: { name: "categoryId", allowNull: false },
        onDelete: "RESTRICT",
      });
     
    };
  
    return Category;
  };