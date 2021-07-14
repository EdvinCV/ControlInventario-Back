const express = require('express');
const productoRouter = express.Router();
// Express Validator
const {body} = require('express-validator');
// Controllers
const {getProductosController, postProductoController, putProductoController, deleteProductoController} = require('./productoController');

productoRouter
    .get('/', getProductosController)
    .post('/', [
        body('name').not().isEmpty(),
        body('precio').isDecimal(),
        body('stock').isNumeric(),
        body('presentacion').isString()
    ], postProductoController)
    .put('/', [
        body('id').not().isEmpty(),
        body('name').not().isEmpty(),
        body('precio').isDecimal(),
        body('stock').isNumeric(),
        body('presentacion').isString()
    ], putProductoController)
    .put('/delete', deleteProductoController);

module.exports = productoRouter;