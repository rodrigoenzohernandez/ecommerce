const fs = require('fs');
const file = fs.readFileSync('./data/productos.json', 'utf-8');
//const products = JSON.parse(file);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const slice = (desc, long) => desc.slice(0, long);
let db = require("../database/models");
var Op = db.Sequelize.Op;
let { check, validationResult, body } = require('express-validator');

const productController = {

    listProducts: function (req, res) {

        try {
            db.Productos.findAll({
                where: { estado: '1' },
                include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
            })
                .then(function (products) {
                    res.render('products', { title: 'Lista de Productos', products, toThousand, slice });
                });
        } catch (error) {

            console.log(error)
        }
    },

    listProductsAdmin: function (req, res) {
        try {
            db.Productos.findAll(
                {
                    include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
                }
            )
                .then(function (productos) {
                    let products = productos;
                    res.render('productsAdmin', { title: 'Lista de Productos', products, toThousand, slice });
                });
        }
        catch (error) {
            console.log(error)
        }
    },

    detail: function (req, res, next) {

        db.Productos.findByPk(req.params.id, {
            include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
        })
            .then(function (product) {
                if (product) {
                    res.render("productDetail", { product });
                }
                else {
                    res.send("Producto inexistente")
                }
            })
    },

    showAddForm: function (req, res) {

        let categoriasTraidas = db.Categorias.findAll();
        let subcategoriasTraidas = db.Subcategorias.findAll();
        let marcasTraidas = db.Marcas.findAll()
        let unidadmedidas = db.UnidadMedidas.findAll()
        Promise.all([categoriasTraidas, subcategoriasTraidas, marcasTraidas, unidadmedidas])
            .then(function ([categorias, subcategorias, marcas, unidadmedidas]) {
                res.render("productAdd", { categorias: categorias, subcategorias: subcategorias, marcas: marcas, unidadmedidas: unidadmedidas })
            })
    },

    create: function (req, res) {
        let errors = validationResult(req);
        console.log(errors);
        console.log(req.body.estado);
        if (errors.isEmpty()) {
            db.Productos.create({
                subCategoriaID: req.body.subCat,
                marcaID: req.body.marca,
                cantidad: req.body.cantidad,
                unidadMedidaID: req.body.um,
                nombre: req.body.nomProd,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                estado: req.body.estado || 0,
                modelo: req.body.mod,
                temporada: req.body.chkTemporada || 0,
                destacado: req.body.chkOferta || 0,
                envio: req.body.chkEnvio || 0,
                stock: req.body.stock,
                stockMinimo: req.body.stockMin,
                descuento: req.body.descuento
            }).then(function (prod) {
                db.ImagenesProducto.create({
                    ruta: "/" + req.files[0].filename,
                    productoID: prod.ID
                });
                let msg = "Producto cargado exitosamente";
                let categoriasTraidas = db.Categorias.findAll();
                let subcategoriasTraidas = db.Subcategorias.findAll();
                let marcasTraidas = db.Marcas.findAll()
                let unidadmedidas = db.UnidadMedidas.findAll()
                Promise.all([categoriasTraidas, subcategoriasTraidas, marcasTraidas, unidadmedidas])
                    .then(function ([categorias, subcategorias, marcas, unidadmedidas]) {
                        res.render("productAdd", { categorias: categorias, subcategorias: subcategorias, marcas: marcas, unidadmedidas: unidadmedidas, msg: msg })
                    })
            }).catch(function (error) {
                res.send(error);

            });
        } else {
            let categoriasTraidas = db.Categorias.findAll();
            let subcategoriasTraidas = db.Subcategorias.findAll();
            let marcasTraidas = db.Marcas.findAll()
            let unidadmedidas = db.UnidadMedidas.findAll()
            Promise.all([categoriasTraidas, subcategoriasTraidas, marcasTraidas, unidadmedidas])
                .then(function ([categorias, subcategorias, marcas, unidadmedidas]) {
                    res.render("productAdd", { categorias: categorias, subcategorias: subcategorias, marcas: marcas, unidadmedidas: unidadmedidas, errors: errors.errors })
                })
        }
    },

    showEditForm: function (req, res) {

        let pedidoProductos = db.Productos.findByPk(req.params.id);
        let pedidoCategorias = db.Categorias.findAll();
        let pedidoSubcategorias = db.Subcategorias.findAll();
        let pedidoMarcas = db.Marcas.findAll();
        let pedidoImagenes = db.ImagenesProducto.findAll();
        let pedidoUnidadMedida = db.UnidadMedidas.findAll();
        let categoriaSelect = "";

        Promise.all([pedidoProductos, pedidoCategorias, pedidoSubcategorias, pedidoMarcas, pedidoImagenes, pedidoUnidadMedida, categoriaSelect])


            .then(function ([producto, categorias, subcategorias, marcas, imagenes, unidadmedidas, categoriaSelect]) {

                for (var i = 0; i < subcategorias.length; i++) {
                    if (subcategorias[i].ID == producto.subCategoriaID) {
                        categoriaSelect = subcategorias[i].categoriaID
                    }
                };
                res.render("productEdit", { producto, categorias, subcategorias, marcas, imagenes, unidadmedidas, categoriaSelect });

            })
    },


    edit: function (req, res) {
        let errors = validationResult(req);
        console.log(errors);
        if (errors.isEmpty()) {
            db.Productos.update({
                subCategoriaID: req.body.subCat,
                marcaID: req.body.marca,
                cantidad: req.body.cantidad,
                unidadMedidaID: req.body.um,
                nombre: req.body.nomProd,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                estado: req.body.estado || 0,
                modelo: req.body.mod,
                temporada: req.body.chkTemporada || 0,
                destacado: req.body.chkOferta || 0,
                envio: req.body.chkEnvio || 0,
                stock: req.body.stock,
                stockMinimo: req.body.stockMin,
                descuento: req.body.descuento
            }, {
                where: {
                    ID: req.params.id
                }
            })
            res.redirect("/")
        } else {
            let pedidoProductos = db.Productos.findByPk(req.params.id);
            let pedidoCategorias = db.Categorias.findAll();
            let pedidoSubcategorias = db.Subcategorias.findAll();
            let pedidoMarcas = db.Marcas.findAll();
            let pedidoImagenes = db.ImagenesProducto.findAll();
            let pedidoUnidadMedida = db.UnidadMedidas.findAll();
            let categoriaSelect = "";

            Promise.all([pedidoProductos, pedidoCategorias, pedidoSubcategorias, pedidoMarcas, pedidoImagenes, pedidoUnidadMedida, categoriaSelect])
                .then(function ([producto, categorias, subcategorias, marcas, imagenes, unidadmedidas, categoriaSelect]) {
                    for (var i = 0; i < subcategorias.length; i++) {
                        if (subcategorias[i].ID == producto.subCategoriaID) {
                            categoriaSelect = subcategorias[i].categoriaID
                        }
                    };
                    res.render("productEdit", { producto, categorias, subcategorias, marcas, imagenes, unidadmedidas, categoriaSelect, errors: errors.errors });

                })
        }
    },

    listProductsByMarca: function (req, res) {

        try {
            db.Productos.findAll({

                where: { marcaID: req.params.id },
                include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
            })
                .then(function (products) {
                    res.render('products', { title: 'Lista de Productos', products, toThousand, slice, nombreMarca: products[0].marcas.nombre });
                })
                .catch(function (err) {
                    res.render('products', { products: null, toThousand, slice, nombreMarca: "Esta marca no tiene productos asociados" });

                    //res.send("Esta marca no tiene productos asociados")
                });
        } catch (error) {

            console.log(error)
        }
    },

    listProductsByCat: function (req, res) {

        let arraySC = [];

        try {

            db.Categorias.findByPk(req.params.id)

                .then(function (cat) {

                    if (cat) {

                        try {

                            db.Subcategorias.findAll({

                                where: { categoriaID: cat.ID }
                            })
                                .then(function (subcat) {

                                    for (var item of subcat) arraySC.push(item.ID);

                                    try {
                                        db.Productos.findAll({

                                            where: { subCategoriaID: { [Op.in]: arraySC } },
                                            include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
                                        })
                                            .then(function (products) {

                                                res.render('products', { title: 'Lista de Productos', products, toThousand, slice, nombreMarca: cat.nombre });
                                            })
                                            .catch(function (err) {

                                                res.render('products', { products: null, toThousand, slice, nombreMarca: "Esta categoria no tiene productos asociados" });
                                            });
                                    } catch (error) { console.log(error) }
                                })
                                .catch(function (err) {

                                    res.render('products', { products: null, toThousand, slice, nombreMarca: "Esta categoria no tiene productos asociados" });
                                });
                        } catch (error) { console.log(error); }
                    } else { res.render('products', { products: null, toThousand, slice, nombreMarca: "Categoria inexistente" }); };
                })
                .catch(function (err) {

                    res.render('products', { products: null, toThousand, slice, nombreMarca: "Esta categoria no tiene productos asociados" });
                });
        } catch (error) { console.log(error); }
    },

    search: function (req, res) {

        try {

            db.Productos.findAll({

                where: { nombre: { [Op.substring]: req.query.search } },
                include: ['marcas', 'unidadmedidas', 'subcategorias', 'imagenesproductos']
            })
                .then(function (products) {

                    console.log(req.session.user);

                    if (typeof req.session.user !== 'undefined') {

                        if (req.session.user.admin == 1) {

                            res.render('productsAdmin', { title: 'Lista de Productos', products, toThousand, slice });
                        } else {

                            res.render('products', { title: 'Lista de Productos', products, toThousand, slice, nombreMarca: null });
                        }
                    } else {
                        console.log('search: ' + req.query.search);
                        res.render('products', { title: 'Lista de Productos', products, toThousand, slice, nombreMarca: null });
                    }
                })
                .catch(function (err) {
                    res.render('products', { products: null, toThousand, slice, nombreMarca: "No se encontraron productos" });
                });
        } catch (error) {

            console.log(error)
        }
    }
}

module.exports = productController;