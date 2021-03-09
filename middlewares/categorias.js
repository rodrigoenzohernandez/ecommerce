/*
Objetivo: Cargar las categorías del header con un middleware en res.locals, para no tener que pasarlas como parámetro en cada render.
Referencias:
1 --> Defino los items que tiene el admin
2 --> Busco las categorías en la base de datos
3 --> Asigno las categorías a res.locals
4 --> Verifico que el usuario este logueado
4.1 -->  Verifico que el usuario sea admin
4.1.1 --> El usuario es admin, por lo que defino los items y los enlaces para admin
4.1.2 --> El usuario no es admin, por lo que defino los items y los enlaces para un cliente logueado
4.2 --> El usuario no esta logueado, por lo que defino los items para un usuario invitado
*/

const db = require("../database/models");
const itemsAdmin = [ //1
    { ID: 'add', nombre: 'Agregar Producto' },
    { ID: 'admin', nombre: 'Modificar Producto' }
];

module.exports = (req, res, next) => {

    db.Categorias.findAll() //2
        .then((cat) => {

            res.locals.categorias = cat; //3

            if (typeof req.session.user !== "undefined") { //4

                if (req.session.user.admin === 1) { //4.1
                    res.locals.itemsNav = itemsAdmin; //4.1.1
                    res.locals.href = '/products/'
                } else { //4.1.2
                    res.locals.itemsNav = cat;
                    res.locals.href = '/products/categoria/'
                }
            } else { //4.2

                res.locals.itemsNav = cat;
                res.locals.href = '/products/categoria/'
            }

            next();
        })
        .catch((e) => console.log(e));
}