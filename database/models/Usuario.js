module.exports = (sequelize, dataTypes) => {

    let alias = "Usuarios";

    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: dataTypes.STRING,
        apellido: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        telefono: dataTypes.STRING,
        admin: dataTypes.STRING,
        avatar: dataTypes.STRING,
    };

    let config = {
        tableName: "usuario",
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);
    return Producto;
}