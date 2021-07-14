module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define('Venta', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        precio: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        tipoVenta: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true
    });
    return Venta;
}