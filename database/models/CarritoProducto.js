module.exports = (sequelize, dataTypes) => {
    let alias = 'CarritoProducto'; //Este alias es el que se utiliza para las asociaciones
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        carritoID: dataTypes.STRING,
        productoID: dataTypes.INTEGER,
        cantidadCarritoProducto: dataTypes.INTEGER,
        preciocongelado: dataTypes.FLOAT
    }
    let config = {
        tableName: 'carrito_producto',
        timestamps: false
    }
    const CarritoProducto = sequelize.define(alias, cols, config);

    CarritoProducto.associate = function (models) {
        CarritoProducto.belongsTo(
            models.Productos,
            {
                as: 'itemsDescription',
                foreignKey: 'productoID',
            }
        )
    }


    return CarritoProducto;
}