let db = require("../../database/models");

let cartAPIController = {

    cerrados: function (req, res) {

        try {
            db.Carrito.count({ where: { estado: '0' }, limit: 1 })
                .then(function (carritos) {

                    let totalVentas = {

                        meta: {

                            status: 200,
                            endpoint: '/api/carts'
                        },

                        data: { total: carritos }
                    };

                    res.json(totalVentas);
                });
        } catch (error) {

            console.log(error)
        }
    }
}

module.exports = cartAPIController;