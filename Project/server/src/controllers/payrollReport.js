const db = require('../../models');
const PayrollReport = db.PayrollReport;
const AttendanceLog = db.AttendanceLog;
const User = db.User;

const PayrollReportController = {
  createPayrollReport: async (req, res) => {
    try {
      const { month, year } = req.body;
      const userId = req.user.id;

      // Ambil basedsalary dari model User
      const user = await User.findByPk(userId);
      const baseSalary = user.basedsalary || 0;

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

      const dailyRate = baseSalary / 30; // Gaji per hari
      const maxHoursPerDay = 7; // Maksimum 7 jam per hari
      let totalSalary = 0;
      attendanceLogs.forEach(log => {
        const hoursWorked = (log.clockOut - log.clockIn) / (1000 * 60 * 60);
        const calculatedSalary = Math.min(hoursWorked, maxHoursPerDay) * dailyRate;
        totalSalary += calculatedSalary;
      });

      const deductions = totalSalary / 2;

      const payrollReport = await PayrollReport.create({
        userId,
        month,
        year,
        deductions,
        totalSalary,
      });

      res.status(201).json({ message: 'Laporan gaji berhasil dibuat', payrollReport });
    } catch (error) {
      console.error('Terjadi kesalahan saat membuat laporan gaji:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat membuat laporan gaji' });
    }
  },

  getPayrollReport: async (req, res) => {
    try {
      const { month, year } = req.query;
      const userId = req.user.id;

      const payrollReports = await PayrollReport.findAll({
        where: {
          userId,
          month,
          year,
        },
      });

      res.status(200).json({ payrollReports });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil laporan gaji:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil laporan gaji' });
    }
  },

  getAllPayrollReports: async (req, res) => {
    try {
      const payrollReports = await PayrollReport.findAll({
        include: [{
          model: User,
          attributes: ['id', 'fullname', 'email']
        }],
      });

      res.status(200).json({ payrollReports });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil laporan gaji:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil laporan gaji' });
    }
  },
  generateSalaryReport: async (req, res) => {
    try {
      const usersWithPayroll = await User.findAll({
        include: [
          {
            model: PayrollReport,
            attributes: ['month', 'year', 'deductions', 'totalSalary'],
          },
        ],
        attributes: ['fullname', 'email', 'basedsalary'],
      });
  
      const salaryReport = usersWithPayroll.map((user) => ({
        name: user.fullname,
        email: user.email,
        basedSalary: user.basedsalary,
        deductions: user.PayrollReports[0] ? user.PayrollReports[0].deductions : 0,
        totalSalary: user.PayrollReports[0] ? user.PayrollReports[0].totalSalary : 0,
      }));
  
      return res.json({salaryReport});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error generating salary report' });
    }
  }
};


module.exports =  PayrollReportController;
