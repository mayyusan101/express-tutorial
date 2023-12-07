const { Sequelize }  = require("sequelize");

const sequelize = new Sequelize('node_shop', 'root', 'mayyusan', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;