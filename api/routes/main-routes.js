const express = require('express');
const router = express.Router();

const colores = require('./../controllers/colores');
router.use('/colores', colores);  

module.exports = router;