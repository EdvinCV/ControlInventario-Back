module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        precio: {
            type: Sequelize.DECIMAL,
            allowNull: false  
        },
        presentacion: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true
    });
    return Producto;
}