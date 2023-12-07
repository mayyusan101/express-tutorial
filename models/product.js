const { DataTypes } = require("sequelize");
const sequelize = require('../util/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(1234)
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = Product;

