module.exports = (sequelize, dataTypes) => {
    let alias = 'ImagenesProducto'; //Este alias es el que se utiliza para las asociaciones
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        ruta: dataTypes.STRING,
        productoID: dataTypes.INTEGER,
    }
    let config = {
        tableName: 'imagen_producto',
        timestamps: false
    }
    const ImagenProducto = sequelize.define(alias, cols, config);
    return ImagenProducto;
}