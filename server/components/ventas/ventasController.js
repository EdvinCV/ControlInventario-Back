/*
    USER CONTROLLER: Here there are the functions to manage all the endpoints of the users, also
    the functions to manage the login and logout endpoints.
*/
// Models
const db = require('../../config/dbconnection');
const Producto = db.productos;
const Categoria = db.categorias;
const Venta = db.ventas;
// Express validator
const {validationResult} = require('express-validator');

exports.getVentasController = async (req, res) => {
    try {
        let ventas = await Venta.findAll({include: Producto, where: {status: true}});
        res.status(200).json({
            ok: true,
            ventas
        });
    } catch(error){
        console.log(error);
    }
}

exports.postVentaController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        const productos = req.body.ventas;
        productos.forEach(async (producto)=> {
            const venta = {
                precio: producto.precio,
                cantidad: producto.cantidad,
                subtotal: producto.subtotal,
                tipoVenta: req.body.tipoVenta,
                ProductoId: producto.idProducto
            };
            await Venta.create(venta);
            const productoEncontrado = await Producto.findOne({where: {id: producto.idProducto}})
            if(productoEncontrado !== null){
                productoEncontrado.stock = productoEncontrado.stock - producto.cantidad;
                productoEncontrado.save();
            } else {
                res.status(200).json({
                    ok: true,
                    message: "Producto no encontrado.",
                });
            }
        });
        res.status(200).json({
            ok: true,
            message: "Venta realizada correctamente.",
        });
    } catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Ha ocurrido un error",
            error
        });
    }
}

exports.deleteVentaController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        console.log("REQ", req.body);
        const producto = {
            id: req.body.id,
            status: false
        };
        // Buscar el producto
        const productoEliminado = await Producto.update(producto, {
            where: {
                id: producto.id
            }
        });
        if(productoEliminado[0] == 1){
            res.status(200).json({
                ok: true,
                message: "Producto eliminado correctamente",
                data: productoEliminado[0]
            });
        } else {
            res.status(200).json({
                ok: true,
                message: "Producto no encontrado.",
                data: productoEliminado[0]
            });
        }
    } catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Ha ocurrido un error, vuelva a intentar mas tarde.",
            error
        });
    }
}