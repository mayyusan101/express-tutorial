const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    qty: DataTypes.INTEGER
});

module.exports = CartItem;



// A user has one cart
// one products belongs to many cart
// one cart belongs to many products