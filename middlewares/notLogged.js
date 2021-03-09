/*
Objetivo: Si el usuario no esta logueado, lo redirijo al index
*/

module.exports = (req, res, next) => {
    req.session.user ? next() : res.redirect('/login');
}