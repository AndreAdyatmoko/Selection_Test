const router = require('express').Router();
const {PayrollReportController} = require('../controllers');
const { verifyToken } = require ('../middleware/verifyToken');


router.post('/create', verifyToken, PayrollReportController.createPayrollReport);
router.get('/get', verifyToken, PayrollReportController.getPayrollReport);
router.get('/all', PayrollReportController.getAllPayrollReports)
router.get('/coba', PayrollReportController.generateSalaryReport);

module.exports = router;