let axios = require ('axios');

let defaults = require ('./default');

let categoriaSubcategorias = {
    getById: function(id) {
        return axios({
            ...defaults,
            method: 'get',
            url:'/${id}'
        });
    },
};

module.exports = categoriaSubcategorias
