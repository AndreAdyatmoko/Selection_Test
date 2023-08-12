const db = require('../../models');
const PayrollReport = db.PayrollReport;

const PayrollReportController = {
  createPayrollReport: async (req, res) => {
    try {
      const { userId, month, year, baseSalary, deductions, totalSalary } = req.body;
      const payrollReport = await PayrollReport.create({
        userId,
        month,
        year,
        baseSalary,
        deductions,
        totalSalary,
      });
      res.status(201).json({ message: 'Payroll report created successfully', payrollReport });
    } catch (error) {
      console.error('Error creating payroll report:', error);
      res.status(500).json({ message: 'An error occurred while creating payroll report' });
    }
  },

  getPayrollReport: async (req, res) => {
    try {
      const { userId, month, year } = req.query;
      const payrollReports = await PayrollReport.findAll({
        where: {
          userId,
          month,
          year,
        },
      });
      res.status(200).json({ payrollReports});
    } catch (error) {
      console.error('Error fetching payroll reports:', error);
      res.status(500).json({ message: 'An error occurred while fetching payroll reports' });
    }
  },
};

module.exports = PayrollReportController;
