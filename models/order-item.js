const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");


const OrderItem = sequelize.define("OrderItem",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    qty: DataTypes.INTEGER
});

module.exports = OrderItem;