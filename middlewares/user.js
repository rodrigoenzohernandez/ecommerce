/*
Objetivo: Guardar en res.locals al usuario, si es que esta logueado.
*/
module.exports = (req, res, next) => {
    if (req.session.user) res.locals.user = req.session.user;
    next();
}