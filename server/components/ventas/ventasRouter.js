const express = require('express');
const productoRouter = express.Router();
// Express Validator
const {body} = require('express-validator');
// Controllers
const {getVentasController, postVentaController, deleteVentaController} = require('./ventasController');

productoRouter
    .get('/', getVentasController)
    .post('/', [
        body('ventas').not().isEmpty().isArray()
    ], postVentaController)
    .put('/delete', deleteVentaController);

module.exports = productoRouter;