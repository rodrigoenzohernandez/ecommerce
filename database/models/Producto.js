module.exports = (sequelize, dataTypes) => {

    let alias = "Productos";
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        precio: dataTypes.FLOAT,
        cantidad: dataTypes.INTEGER,
        descripcion: dataTypes.STRING,
        estado: dataTypes.BOOLEAN,
        modelo: dataTypes.STRING,
        temporada: dataTypes.BOOLEAN,
        destacado: dataTypes.BOOLEAN,
        envio: dataTypes.BOOLEAN,
        stock: dataTypes.INTEGER,
        stockMinimo: dataTypes.INTEGER,
        descuento: dataTypes.INTEGER,
        subCategoriaID: dataTypes.INTEGER,
        marcaID: dataTypes.INTEGER,
        unidadMedidaID: dataTypes.INTEGER
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models) {
        Producto.belongsTo(
            models.Marcas,
            {
                as: 'marcas',
                foreignKey: 'marcaID' //id de FK en la tabla productos
            }
        ),
            Producto.belongsTo(
                models.UnidadMedidas,
                {
                    as: 'unidadmedidas',
                    foreignKey: 'unidadMedidaID' //id de FK en la tabla productos
                }
            ),
            Producto.belongsTo(
                models.Subcategorias,
                {
                    as: 'subcategorias',
                    foreignKey: 'subCategoriaID' //id de FK en la tabla productos
                }
            ),
            Producto.belongsToMany(
                models.ImagenesProducto,
                {
                    as: 'imagenesproductos',
                    through: 'imagen_producto',
                    foreignKey: 'productoID', //FK en la tabla imagen_producto
                    otherKey: 'ID', //ID del producto
                    timestamps: false
                }
            )
    }
    return Producto;
}