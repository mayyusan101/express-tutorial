const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");


const Order = sequelize.define("Order",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Order;