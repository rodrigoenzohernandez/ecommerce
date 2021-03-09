let db = require("../../database/models");

let categoriasController = {

    list: function (req, res) {

        let cat = db.Categorias.findAll();
        let subcat = db.Subcategorias.findAll();

        Promise.all([cat, subcat])
            .then(function ([cat, subcat]) {

                let categorias = {

                    meta: {

                        status: 200,
                        endpoint: '/api/categorias'
                    },

                    data: {
                        categorias: cat,
                        subcategorias: subcat
                    }
                };

                res.json(categorias);
            })
            .catch(e => { console.log(e) });
    }
}

module.exports = categoriasController;