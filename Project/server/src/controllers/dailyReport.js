const db = require('../../models');
const User = db.User;
const AttendanceLog = db.AttendanceLog;
const PayrollReport = db.PayrollReport;

const calculateDailySalary = (hoursWorked, baseSalary) => {
  const maxHoursPerDay = 7; // Maksimum 7 jam per hari
  const dailyRate = baseSalary / 30; // Gaji per hari

  const calculatedSalary = Math.min(hoursWorked, maxHoursPerDay) * dailyRate;
  return calculatedSalary;
};

const ReportController = {
  getUserPayrollReport: async (req, res) => {
    try {
      const { userId, month, year } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const attendanceLogs = await AttendanceLog.findAll({
        where: {
          userId,
          clockIn: {
            [db.Sequelize.Op.not]: null,
          },
          clockOut: {
            [db.Sequelize.Op.not]: null,
          },
          [db.Sequelize.Op.and]: [
            db.Sequelize.where(db.Sequelize.fn('MONTH', db.Sequelize.col('clockIn')), month),
            db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('clockIn')), year),
          ],
        },
      });

      const baseSalary = user.basedsalary || 0;
      let totalSalary = 0;

      attendanceLogs.forEach(log => {
        const hoursWorked = (log.clockOut - log.clockIn) / (1000 * 60 * 60);
        const calculatedSalary = calculateDailySalary(hoursWorked, baseSalary);
        totalSalary += calculatedSalary;
      });

      return res.status(200).json({
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          basedsalary: user.basedsalary,
        },
        month,
        year,
        totalSalary,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'An error occurred on the server' });
    }
  },
};

module.exports = { calculateDailySalary, ReportController };
