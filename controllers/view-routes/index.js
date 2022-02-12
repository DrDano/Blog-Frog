const router = require('express').Router();

const frontPageRoutes = require('./front-page-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/', frontPageRoutes);

module.exports = router;