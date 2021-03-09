let db = require("../../database/models");
var Op = db.Sequelize.Op;

const prodAPIController = {

    total: function (req, res) {

        try {

            db.Productos.findAndCountAll({ limit: 1 })

                .then(function (products) {

                    let totalProducts = {

                        meta: {

                            status: 200,
                            endpoint: '/api/productos'
                        },

                        data: { total: products.count }
                    };

                    res.json(totalProducts);
                })
        } catch (error) {

            console.log(error)
        }
    },

    last: function (req, res) {

        try {

            db.Productos.findAll({
                limit: 1,
                order: [['ID', 'DESC']]
            })
                .then(function (product) {


                    db.ImagenesProducto.findAll({ where: { productoID: product[0].ID } })
                        .then(function (imagenes) {

                            let lastProduct = {
                                meta: {
                                    status: 200,
                                    endpoint: '/api/productos/last'
                                },
                                data: {
                                    ID: product[0].ID,
                                    nombre: product[0].nombre,
                                    descripcion: product[0].descripcion,
                                    imagen: imagenes[0].ruta
                                }
                            };

                            res.json(lastProduct);
                        });
                })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = prodAPIController;