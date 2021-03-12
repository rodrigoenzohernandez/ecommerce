module.exports = (sequelize, dataTypes) => {

    let alias = "Carrito";
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioID: dataTypes.INTEGER,
        total: dataTypes.FLOAT,
        fechaCompra: dataTypes.DATE,
        fechaCreacion: dataTypes.DATE,
        estado: dataTypes.BOOLEAN
    }
    let config = {
        tableName: "Carrito",
        timestamps: false
    }

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function (models) {
        Carrito.belongsToMany(
            models.Productos,
            {
                as: 'productosCarrito',
                through: 'carrito_producto',
                foreignKey: 'carritoID',
                otherKey: 'productoID',
                timestamps: false
            }
        )
    }

    Carrito.associate = function (models) {
        Carrito.belongsToMany(
            models.CarritoProducto,
            {
                as: 'items',
                through: 'carrito_producto',
                foreignKey: 'carritoID',
                otherKey: 'ID',
                timestamps: false
            }
        )
    }

    return Carrito;
}