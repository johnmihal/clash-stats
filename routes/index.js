var express = require('express');
var router = express.Router();

const clashStatsController = require("../controllers/clashStatsController");
const dashboardController = require("../controllers/clashStatsDashboardController");

/* GET home page. */
router.get('/', clashStatsController.index);
router.get('/create', dashboardController.create_get);
router.post('/create', dashboardController.create_post);
router.get('/dashboard/:id', dashboardController.show_dashboard);
module.exports = router;
