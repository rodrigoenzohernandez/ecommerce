/*
Objetivo: Si el usuario es admin, lo redirijo al index
1 --> Verifico si el usuario esta logueado
1.1 --> Si el usuario esta logueado, lo redirijo al index
2 --> El usuario no esta logueado, continúo con un next
*/
module.exports = (req, res, next) => {
    if (req.session.user) { //1
        req.session.user.admin == 1 ? res.redirect('/') : next(); //1.1
    } else next(); //2
}