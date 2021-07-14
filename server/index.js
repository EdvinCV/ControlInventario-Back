/**
 * SISTEMA WEB - LA BUBA 
 * 
 * EDVIN CALDERÓN - 2021
 * 
 */

 //Express
const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./config/dbconnection');
const Producto = db.productos;
const Categoria = db.categorias;
const Venta = db.ventas;
const cors = require('cors'); 
// ENV
require('dotenv').config();
// CORS
const corsOptions = {
    origin: "http://localhost:3000"
};

// Middlewares and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/api/users', require('./components/users/userRouter'));
app.use('/api/categoria', require('./components/categorias/categoriasRouter'));
app.use('/api/producto', require('./components/productos/productoRouter'));
app.use('/api/venta', require('./components/ventas/ventasRouter'));

// DB Connection
// Categoria -> Producto
Producto.belongsTo(Categoria);
Categoria.hasMany(Producto);
// Venta -> Producto
Producto.hasMany(Venta);
Venta.belongsTo(Producto);

db.sequelize.sync().then(() => {
    console.log("DB");
});


app.listen(8000, (err) => {
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log(process.env.DB_PASS);
    console.log(`Server running at port: 3001`);
});