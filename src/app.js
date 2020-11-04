const express = require('express');
const app = express();
const productRoute = require('../routes/product.route.js');
const userRoute = require('../routes/user.route');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors')

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

app.use('/products', productRoute);
app.use('/users', userRoute);

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(app.get('port'), () => {
    console.log(`El servidor se esta ejecuando en el puerto ${app.get('port')}`);
});