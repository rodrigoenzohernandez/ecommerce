const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Sequelize } = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const slice = (desc, long) => desc.slice(0, long);
const db = require("../database/models");

const controller = {

  msg: {},

  //--------------------------------------------------------------------GET-INDEX
  showProductsIndex: function (req, res) {

    try {

      let productos = db.Productos.findAll(
        {
          //where: Sequelize.and({destacado: '1'},{estado: '1'}), RH: No borrar
          where: { destacado: '1', estado: '1' },
          include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
        });

      let marcas = db.Marcas.findAll();

      Promise.all([productos, marcas])

        .then(function ([productos, marcas]) {

          // req.session.user viene de la session creada en el Login
          if (typeof req.session.user !== "undefined") {

            res.render('index', { productos, marcas, toThousand, slice, user: req.session.user });
          } else {

            //res.send(productos)
            //Categorias se esta cargando en un middleware y pasandose a res.locals.categorias
            //al pasarlas por ahi no es necesario pasarlas como parametro en el render :)
            res.render('index', { productos, marcas, toThousand, slice });
          }
        }).catch(function (err) {
          res.render('error', { error: err.parent.code })
        });
    } catch (error) { console.log(error) }
  },

  //--------------------------------------------------------------------GET-REGISTER
  formRegister: function (req, res) {

    res.render('register');
  },

  //--------------------------------------------------------------------GET-LOGIN
  formLogin: function (req, res) {

    //  El msg viene desde el register (redirect) cuando un usuario es registrado
    //  sino esta vacio(evaluar como limpiarlo)       
    res.render('login', { msg: controller.msg });
  },

  //--------------------------------------------------------------------POST-LOGIN
  checkUser: (req, res) => {

    try {

      db.Usuarios.findOne({ where: { email: req.body.user } })
        .then((user) => {

          //Usuario No Existe
          if (!user) {

            controller.msg.text = 'Usuario o contraseña incorrecto';
            controller.msg.type = 'E'
            
            res.render('login', { msg: controller.msg });
          } else {

            // Usuario encontrado
            //Se compara el psw que viene del login (sin encriptar) contra el psw encriptado
            //Si esta ok -> creo sesion usuario
            if (bcrypt.compareSync(req.body.psw, user.password)) {

              controller.msg = {};
              req.session.user = user.dataValues;
              res.redirect('/');
              //Sino error -> Contraseña incorrecta
            } else {

              controller.msg.text = 'Usuario o contraseña incorrecto';
              controller.msg.type = 'E'
              
              res.render('login', { msg: controller.msg });
            }
          }
        });
    } catch (error) { console.log(error) };
  },
  //--------------------------------------------------------------------POST-REGISTER
  checkRegister: (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {

      // Envio errores de Express Validator al front (De a uno)
      controller.msg.text = errors.errors[0].msg;
      controller.msg.type = 'E';
      
      res.render('register', { msg: controller.msg });
    } else {

      try {

        db.Usuarios.findOne({ where: { email: req.body.email } })
          .then((resultado) => {

            if (resultado) {

              // Envio error al front -> Usuario ya creado
              controller.msg.text = 'El usuario ' + req.body.email + ' ya se encuentra registrado';
              controller.msg.type = 'E';
              
              res.render('register', { msg: controller.msg });
            } else {

              let pswE = bcrypt.hashSync(req.body.psw, 10);

              //Creo usuario y lo mando al login a loguearse
              try {
                db.Usuarios.create({

                  nombre: req.body.name,
                  apellido: req.body.apellido,
                  email: req.body.email,
                  password: pswE,
                  admin: 0
                })
                  .then((user) => {

                    controller.msg.text = 'El usuario ' + user.nombre + ' ha sido registrado. Favor iniciar sesión. ';
                    controller.msg.type = 'S';
                    res.redirect('login');
                  });
              } catch (error) { console.log(error) };
            }
          });
      } catch (error) { console.log(error) };
    }
  },
}

module.exports = controller;