const sequelize = require('../util/database');
const { DataTypes } = require("sequelize");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
});

module.exports = User;
