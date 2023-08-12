const router = require('express').Router();
const {AttendanceController} = require('../controllers');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/clock-in', verifyToken, AttendanceController.clockIn);
router.post('/clock-out', verifyToken, AttendanceController.clockOut);
router.get('/history', verifyToken, AttendanceController.getAttendanceHistory);

module.exports=router;