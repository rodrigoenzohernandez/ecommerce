module.exports = (sequelize, dataTypes) => {

    let alias = 'Marcas'; //Este alias es el que se utiliza para las asocia

    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
        ruta: dataTypes.STRING,
    }

    let config = {

        tableName: 'marca',
        timestamps: false
    }

    const Marca = sequelize.define(alias, cols, config);

    Marca.associate = function (models) { //Esta relación la vamos a usar cuando en el HOME mostremos los productos por marca.
        Marca.hasMany(
            models.Productos,
            {
                as: 'productos',
                foreignKey: 'marcaID' //FK de la marca en la tabla producto
            }
        )
    }

    return Marca;
}