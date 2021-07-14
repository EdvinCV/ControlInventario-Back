/*
    USER CONTROLLER: Here there are the functions to manage all the endpoints of the users, also
    the functions to manage the login and logout endpoints.
*/
// Models
const db = require('../../config/dbconnection');
const Producto = db.productos;
const Categoria = db.categorias;
// Express validator
const {validationResult} = require('express-validator');

exports.getProductosController = async (req, res) => {
    try {
        let productos = await Producto.findAll({include: Categoria, where: {status: true}});
        
        res.status(200).json({
            ok: true,
            productos
        });
    } catch(error){
        console.log(error);
    }
}

exports.postProductoController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        const producto = {
            name: req.body.name,
            precio: req.body.precio,
            CategoriumId: req.body.categoria,
            presentacion: req.body.presentacion,
            stock: req.body.stock
        }
        const productoCreado = await Producto.create(producto);
        res.status(200).json({
            ok: true,
            message: "Producto creado correctamente",
            data: productoCreado
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

exports.putProductoController = async (req, res) => {
    // If there are errors are returned
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    try {
        const producto = {
            id: req.body.id,
            name: req.body.name,
            precio: req.body.precio,
            presentacion: req.body.presentacion,
            stock: req.body.stock
        }
        // Buscar el producto
        const productoEditado = await Producto.update(producto, {
            where: {
                id: producto.id
            }
        });
        if(productoEditado[0] == 1){
            res.status(200).json({
                ok: true,
                message: "Producto editado correctamente",
                data: productoEditado[0]
            });
        } else {
            res.status(200).json({
                ok: true,
                message: "Producto no encontrado.",
                data: productoEditado[0]
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

exports.deleteProductoController = async (req, res) => {
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