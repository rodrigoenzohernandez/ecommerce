module.exports = (sequelize, dataTypes) => {
    let alias = 'UnidadMedidas'; //Este alias es el que se utiliza para las asociaciones
    let cols = {
        ID: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
    }
    let config = {
        tableName: 'unidad_medida',
        timestamps: false
    }

    const UnidadMedida = sequelize.define(alias, cols, config);

    return UnidadMedida;
}