const router = require('express').Router();
const {PayrollReportController} = require('../controllers');

router.post('/create', PayrollReportController.createPayrollReport);
router.get('/get', PayrollReportController.getPayrollReport);

module.exports = router;