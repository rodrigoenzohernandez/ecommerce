let db = require("../database/models");
let { check, validationResult, body } = require('express-validator')


const controller = {
	showCart: function (req, res) {
		let userID = req.session.user.ID;
		db.Carrito.findAll(
			{
				include: [
					{
						association: 'items', //Asociación en carrito hacia carrito_producto
						required: true,
						include:
							[
								{
									association: 'itemsDescription', //Asociación en carrito_producto hacia producto
									include:
										[
											{
												association: 'imagenesproductos' //Asociación en producto hacia imagenes_producto
											}
										]
								}
							]
					}
				],
				where: { estado: '1', usuarioID: userID }
			}
		).then(function (carrito) {
			if (carrito) {
				res.render("productCart", { carrito });
			}
			else {
				res.send("No tiene carrito")
			}
		}).catch(function (error) { res.send(error) })
	},
	addItem: function (req, res) {

		let errors = validationResult(req)

		if (!errors.isEmpty()) {

			if (errors.errors[0].value == '') {
				addItem(req, res)
			}
			else {
				res.redirect("/");
			}

		} else {
			addItem(req, res)
		}



	},
	removeItem: function (req, res) {
		db.CarritoProducto.findAll({
			where: { ID: req.body.itemID, },
		}).then(function (itemToRemove) {
			//Elimino el item
			db.CarritoProducto.destroy({ where: { ID: req.body.itemID, }, }
			).then(function () {
				//Busco la cantidad de items que tiene el carrito.
				db.CarritoProducto.findAndCountAll({
					limit: 1, where: { carritoID: req.body.carritoID, },
				})
					.then(function (items) {
						if (items.count == 0) {
							//El carrito no tiene más items, por lo tanto lo elimino.
							db.Carrito.destroy({
								where: {
									ID: req.body.carritoID,
								},
							})
						}
						else {
							//Tiene al menos un item. Actualizo el total.
							//let subtotal = (itemToRemove[0].cantidadCarritoProducto * itemToRemove[0].preciocongelado); +

							db.CarritoProducto.findAll({
								attributes: [[db.sequelize.literal('SUM(cantidadCarritoProducto * preciocongelado)'), 'total']],
								where: {
									carritoID: req.body.carritoID,
								},
							}).then(function (total) {
								db.Carrito.update({
									total: total[0].dataValues.total
								},
									{
										where: { ID: req.body.carritoID }
									}).then(function () {
										res.redirect('/productCart')
									})
							})
						} res.redirect('/productCart')
					});
			}).catch((e) => res.json(e))
		})
	},
	confirmCart: function (req, res) {

		db.Carrito.update({
			estado: 0, //Cuando el estado esta en 0, quiere decir que está cerrado.
			fechaCompra: new Date(),
		},
			{ where: { ID: req.body.carritoID } }
		).then(function () {
			res.render("productCart", { carrito: null, mensaje: "La compra " + req.body.carritoID + " fue registrada correctamente" });
		})
	},
	editItem: async function (req, res) {
		let arrayCantidades = req.body.cant;

		for (i = 0; i < arrayCantidades.length; i++) {

			let cantidad;
			let itemID;
			//Defino las variables de acuerdo a si viene un array o no.
			if (req.body.carritoID.length == 2) {
				//no los obtengo desde un array
				cantidad = req.body.cant
				itemID = req.body.itemID
			}
			else {
				//Los obtengo de un array
				cantidad = req.body.cant[i];
				itemID = req.body.itemID[i];
			}


			if (Number(cantidad) == 0) { //Si la cantidad es 0 elimino el item
				db.CarritoProducto.findAll({
					where: { ID: itemID, },
				}).then(function (itemToRemove) {
					//Elimino el item
					db.CarritoProducto.destroy({ where: { ID: itemID, }, }
					).then(function () {
						//Busco la cantidad de items que tiene el carrito.
						db.CarritoProducto.findAndCountAll({
							limit: 1, where: { carritoID: req.body.carritoID[0], },
						})
							.then(async function (items) {
								if (items.count == 0) {
									//El carrito no tiene más items, por lo tanto lo elimino.
									await db.Carrito.destroy({
										where: {
											ID: req.body.carritoID[0],
										},
									})
								}
								else {
									//Tiene al menos un item. Actualizo el total.		
									await db.CarritoProducto.findAll({
										attributes: [[db.sequelize.literal('SUM(cantidadCarritoProducto * preciocongelado)'), 'total']],
										where: {
											carritoID: req.body.carritoID[0],
										},
									}).then(async function (total) {
										await db.Carrito.update({
											total: total[0].dataValues.total
										},
											{
												where: { ID: req.body.carritoID[0] }
											}).then(function () {
												res.redirect('/productCart')
											})
									})
								}
								res.redirect('/productCart')
							});
					}).catch((e) => res.json(e))
				})
			}
			else { //Si la cantidad no es 0 hago el update
				db.CarritoProducto.update({
					cantidadCarritoProducto: cantidad
				},
					{ where: { ID: itemID } }
				).then(async function () {

					await db.CarritoProducto.findAll({
						attributes: [[db.sequelize.literal('SUM(cantidadCarritoProducto * preciocongelado)'), 'total']],
						where: {
							carritoID: req.body.carritoID[0],
						},
					}).then(function (total) {
						db.Carrito.update({
							total: total[0].dataValues.total
						},
							{
								where: { ID: req.body.carritoID[0] }
							}).then(function () {
								res.redirect('/productCart')
							})
					})
					res.redirect('/productCart')
				})
			}
		} 	//termina el for		
	}
}

function addItem(req, res) {

	let userID = req.session.user.ID;
	let productID = req.body.productID;

	//1- Busco el producto
	db.Productos.findByPk(productID)
		.then(function (product) {
			//1.1- Validar si no existe el carrito
			db.Carrito.findAll(
				{ where: { estado: '1', usuarioID: userID } }
			).then(function (cart) {
				if (!cart[0]) {
					//1.1.1- No existe el carrito. Crear carrito
					db.Carrito.create({
						usuarioID: userID,
						total: 0,
						fechaCompra: "0",
						fechaCreacion: new Date(),
						estado: 1
					}
					).then(function (carrito) {
						createItem(carrito.ID, productID, req.body.cantidad || 1, product.precio, carrito.total, res, req)
					})
				} //Agrego el item al carrito existente
				else { createItem(cart[0].ID, productID, req.body.cantidad || 1, product.precio, cart[0].total, res, req) }
			})
		})

}

//La lógica se encuentra en una función, para evitar repetir código.
function createItem(carritoID, productID, cantidad, precio, totalActual, res, req) {
	db.CarritoProducto.findAndCountAll({
		limit: 1,
		where: { carritoID: carritoID, productoID: productID },
	})
		.then(function (items) {
			if (items.count == 0) {
				//El item no existe en el carrito

				db.CarritoProducto.create(
					{
						carritoID: carritoID,
						productoID: productID,
						cantidadCarritoProducto: cantidad,
						preciocongelado: precio
					}
				)
					.then(updateTotal(totalActual, precio, cantidad, carritoID, res))
					.catch(function (err) { res.json(err) })
			}
			else {
				//El item existe en el carrito, tengo que hacer un update de la cantidad
				let cantidadTotal = Number(items.rows[0].cantidadCarritoProducto) + Number(req.body.cantidad || 1)
				db.CarritoProducto.update({
					cantidadCarritoProducto: cantidadTotal
				},
					{ where: { ID: items.rows[0].ID } }
				).then(updateTotal(totalActual, precio, Number(req.body.cantidad || 1), carritoID, res))
			}
		});
}

function updateTotal(totalActual, precio, cantidad, carritoID, res) {
	let total = totalActual;
	total += (precio * cantidad);
	//1.2.1.1 Actualizo el total del carrito
	db.Carrito.update({
		total: total
	},
		{ where: { ID: carritoID } }
	)
		.then(function () { res.redirect('/productCart') })
}

module.exports = controller;