module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: DataTypes.STRING,
      restaurantCoverImage: DataTypes.STRING,
    },
    { underscored: true }
  );
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Category, {
      foreignKey: { name: "userId", allowNull: false },
      onDelete: "RESTRICT",
    });
  };

  return User;
};
