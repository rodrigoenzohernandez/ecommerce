/*
Objetivo: Si es el usuario admin, lo redirijo a la ruta de administrador
*/

module.exports = (req, res, next) => {

    if (req.session.user) {
        req.session.user.admin == 1 ? res.redirect('/products/admin') : next();
    } else next();
}