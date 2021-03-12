/*
Objetivo: Si el usuario no esta logueado, lo envío al index.
*/

module.exports = (req, res, next) => {
    req.session.user ? res.redirect('/') : next();
}