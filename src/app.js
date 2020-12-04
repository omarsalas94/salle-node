// Dependencias para el proyecto
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parse el cuerpo enviado en la petición
const morgan = require('morgan'); // Devuelve algunos datos de la petición
const path = require('path'); // Acceder a los directorios del proyecto
var cors = require('cors'); // Permite el acceso a los clientes
const mongoose = require('mongoose');
// - Dependendencias para el proyecto

// Archivo de rutas
const productRoute = require('../routes/product.route.js');
const userRoute = require('../routes/user.route');
const queryRoute = require('../routes/query.route');
// - Archivo de rutas

// Configuraciones
// export PORT=3100 
app.set('port', process.env.PORT || 3000);
// - Configiguraciones


// Midleware: Procesar datos antes de llegar a las rutas
app.use(cors()); // Cors
// Parsea la solicitud del cliente
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:  false}));
function isLogged(req, res, next) { // Valida que el usuario este logged
    // console.log('Middleware isLogged');
    next();
}
app.use(isLogged);
app.use(morgan('dev')); // Devuelve algunos datos de la petición
// -  Midleware: Procesar datos antes de llegar a las rutas

// Conexión a MongoDB
// mongodb://users:password@host:port/database 
// Si quieres probar las consultas de la ruta queries hay que usar la base de datos drivingLesson
// Si quieres probar el crud con angular cambiar por la base de datos SalleApp
mongoose.connect('mongodb+srv://admin:123asdzxc@cluster0.h1ip4.mongodb.net/salle-app?retryWrites=true&w=majority')
    .then((db) => {
        console.log('Conectado a mongodb ');
    }).catch((error) => {
        console.log('No se pudo conectar a mongodb: ', error);
    });
// - Conexión a MongoDB

// Rutas
app.use('/queries', queryRoute)
app.use('/products', productRoute);
app.use('/users', userRoute);
// - Rutas

// Definiendo una carpeta publica
app.use('/my-files', express.static(path.join(__dirname, '../public')));

/* app.get('*', (req, res) => {
    // dirname devuelve el directorio donde se esta mandando llamar
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
}); */

// Ejecuta el servidor en un puerto
app.listen(app.get('port'), () => {
    console.log(`El servidor se esta ejecuando en el puerto ${app.get('port')}`);
});