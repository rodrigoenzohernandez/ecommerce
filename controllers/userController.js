const bcrypt = require('bcrypt');
const db = require("../database/models");

const controller = {

    msg: {},

    listUsers: function (req, res) {
        try {

            db.Usuarios.findAll()
                .then(function (usuarios) {
                    res.send(usuarios)
                });
        } catch (error) { console.log(error) }
    },

    //--------------------------------------------------------------------GET-LOGOUT
    logout: function (req, res) {

        req.session.destroy();
        res.redirect('/');
    },

    //--------------------------------------------------------------------GET-PROFILE
    profile: function (req, res) {

        if (req.params.id != req.session.user.ID) {

            res.redirect('/');
        } else {

            try {

                db.Usuarios.findOne({ where: { ID: req.session.user.ID } })
                    .then((user) => {

                        //Usuario No Existe
                        if (!user) {

                            req.session.destroy();
                            controller.msg.text = 'Usuario o contraseña incorrecto';
                            controller.msg.type = 'E'

                            res.render('/login', { msg: controller.msg });
                        } else {

                            //Usuario encontrado
                            //Se envian datos para visualizar perfil
                            res.render('userProfile', { user });
                        }
                    });
            } catch (error) { console.log(error) };
        };
    },

    //--------------------------------------------------------------------GET-EDIT
    formEdit: function (req, res) {

        if (req.params.id != req.session.user.ID) {

            res.redirect('/');
        } else {

            try {

                db.Usuarios.findOne({ where: { ID: req.session.user.ID } })
                    .then((user) => {

                        //Usuario No Existe
                        if (!user) {

                            req.session.destroy();
                            controller.msg.text = 'Usuario o contraseña incorrecto';
                            controller.msg.type = 'E'

                            res.render('/login', { msg: controller.msg });
                        } else {

                            //Usuario encontrado
                            //Se envian datos para modificar
                            res.render('userEdit', { user });
                        }
                    });
            } catch (error) { console.log(error) };
        };
    },

    //--------------------------------------------------------------------POST-EDIT
    editUser: function (req, res) {

        if (req.params.id != req.session.user.ID) {

            res.redirect('/');
        } else {

            let pswE = bcrypt.hashSync(req.body.psw, 10);

            try {

                db.Usuarios.update({

                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: pswE
                }, { where: { ID: req.params.id } });

                controller.msg.text = 'El usuario ' + req.body.nombre + ' ha sido modificado.';
                controller.msg.type = 'S';

                //******SI una vez modificado le das de vuelta a modificar pierde el ID - ERRORRRRRRR
                res.render('userEdit', { user: req.body, msg: controller.msg });
            } catch (error) { console.log(error) };
        };
    }
}

module.exports = controller;