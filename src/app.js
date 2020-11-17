const express = require('express');
const app = express();
const productRoute = require('../routes/product.route.js');
const userRoute = require('../routes/user.route');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors')
const mongoose = require('mongoose');

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Cors
app.use(cors());

// Parsea la solicitud del cliente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  false}));

function isLogged(req, res, next) {
    console.log('Middleware isLogged');
    next();
}
app.use(isLogged);

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/SalleApp')
    .then((db) => {
        console.log('Conectado a mongodb ');
    }).catch((error) => {
        console.log('No se pudo conectar a mongodb: ', error);
    });

app.use('/products', productRoute);
app.use('/users', userRoute);

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(app.get('port'), () => {
    console.log(`El servidor se esta ejecuando en el puerto ${app.get('port')}`);
});