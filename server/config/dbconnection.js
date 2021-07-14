const Sequelize = require('sequelize');

const sequelize = new Sequelize('buba', 'root', 'database', {
    host: 'localhost',
    dialect: "mysql",
    operatorAliases: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../components/users/userModel')(sequelize, Sequelize);
db.categorias = require('../components/categorias/categoriasModel')(sequelize, Sequelize);
db.productos = require('../components/productos/productoModel')(sequelize, Sequelize);
db.ventas = require('../components/ventas/ventasModel')(sequelize, Sequelize);

module.exports = db;