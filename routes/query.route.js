const express = require('express');
const router = express.Router();

// importación del controlador
const queries = require('../controllers/query.controller');

router.get('/formas-consulta', queries.formasConsulta);
router.get('/lookup-mongo', queries.lookupMongo);
router.get('/lookup-mongoose', queries.lookupMongoose);

module.exports = router;
