var express = require('express');
var router = express.Router();

const clashStatsController = require("../controllers/clashStatsController");

/* GET home page. */
router.get('/', clashStatsController.index);

module.exports = router;
