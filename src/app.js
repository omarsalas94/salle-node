/* const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Saludos desde el servidor');
    res.end();
});

server.listen(3000, () => {
    console.log('El servidor se esta ejecutando en el puerto 3000');
}); */

const express = require('express');
const app = express();
const productRoute = require('../routes/product.js');
const bodyParser = require('body-parser');

// Parsear la solicitud del cliente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  false}));

app.use('/products', productRoute)

app.listen(3000, () => {
    console.log('El servidor se esta ejecuando en el puerto 3000');
});