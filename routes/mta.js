var express = require('express');
var router = express.Router();

const mtaController = require("../controllers/mtaController")

router.get('/hi', mtaController.index);

module.exports = router;