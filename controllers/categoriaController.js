const controller = {

    showCategoria: function (req, res) {

        try {

            let db = require("../database/models");

            db.Categorias.findAll()
                .then(function (categorias) {

                    res.send(categorias)
                });

        } catch (error) {
            
            console.log(error)
        }
    }
}

module.exports = controller;