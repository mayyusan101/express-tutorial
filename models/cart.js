const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    }
});

module.exports = Cart;