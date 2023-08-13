import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ReportPayroll = () => {
  const [salaryReport, setSalaryReport] = useState([]);

  const fetchSalaryReport = async () => {
    try {
      const response = await axios.get("http://localhost:8000/payroll/coba");
      setSalaryReport(response.data.salaryReport);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalaryReport();
  }, []);

  return (
    <Box p="4">
      <Heading size="xl" mb="4" color="teal.500">
        All Employee Salary Report
      </Heading>
      <Table variant="striped" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Gaji Pokok</Th>
            <Th>Potongan</Th>
            <Th>Total Gaji</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salaryReport.map((report, index) => (
            <Tr key={index}>
              <Td>{report.name}</Td>
              <Td>{report.email}</Td>
              <Td>{report.basedSalary}</Td>
              <Td>{report.deductions}</Td>
              <Td>{report.totalSalary}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReportPayroll;
