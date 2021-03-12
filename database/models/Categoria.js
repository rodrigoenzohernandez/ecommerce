module.exports = (sequelize, dataTypes) => {

    let alias = 'Categorias'; //Este alias es el que se utiliza para las asociaciones

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
        
        tableName: 'categoria',
        timestamps: false
    }

    const Categoria = sequelize.define(alias, cols, config);

   Categoria.associate = function (models) {
        Categoria.hasOne(
            models.Subcategorias,
            {
                as: 'subcategoria',
                foreignKey: 'categoriaID' 
            }
        )
    }
    return Categoria;
}