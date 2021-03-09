/*
Objetivo: Si no es un usuario administrador, no le permito el acceso al recurso solicitado.
Procedimiento:
1 --> Verifico que el usuario este logueado
1.1 --> Si el usuario no es admin, lo redirijo al index
2 --> Si el usuario no esta logueado, lo envío al index
*/
module.exports = (req, res, next) => {

    if (req.session.user) { //1
        req.session.user.admin !== 1 ? res.redirect('/') : next(); //1.1
    } else res.redirect('/');//2
}