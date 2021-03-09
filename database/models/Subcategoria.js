module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategorias'; //Este alias es el que se utiliza para las asociaciones
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        categoriaID: dataTypes.INTEGER,
        nombre: dataTypes.STRING,
    }
    let config = {
        tableName: 'subcategoria',
        timestamps: false
    }

    const Subcategoria = sequelize.define(alias, cols, config);

    Subcategoria.associate = function (models) {
        Subcategoria.belongsTo(
            models.Categorias,
            {
                as: 'categoria',
                foreignKey: 'categoriaID'
            }
        )

    }
    return Subcategoria;
}