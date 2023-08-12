import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const CreatePayrollReport = () => {
  const [payrollData, setPayrollData] = useState({
    userId: '',
    month: '',
    year: '',
    baseSalary: '',
    deductions: '',
    totalSalary: '',
  });
  const toast = useToast();

  const handleCreatePayrollReport = async () => {
    try {
      const response = await axios.post('http://localhost:8000/payroll/create', payrollData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: 'Payroll report created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setPayrollData({
          userId: '',
          month: '',
          year: '',
          baseSalary: '',
          deductions: '',
          totalSalary: '',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while creating payroll report',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box p={4} bg="black" borderRadius="md">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>User ID:</FormLabel>
          <Input
            type="number"
            placeholder="Enter user ID"
            value={payrollData.userId}
            onChange={(e) => setPayrollData({ ...payrollData, userId: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Month:</FormLabel>
          <Input
            type="number"
            placeholder="Enter month"
            value={payrollData.month}
            onChange={(e) => setPayrollData({ ...payrollData, month: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Year:</FormLabel>
          <Input
            type="number"
            placeholder="Enter year"
            value={payrollData.year}
            onChange={(e) => setPayrollData({ ...payrollData, year: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Base Salary:</FormLabel>
          <Input
            type="number"
            placeholder="Enter base salary"
            value={payrollData.baseSalary}
            onChange={(e) => setPayrollData({ ...payrollData, baseSalary: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Deductions:</FormLabel>
          <Input
            type="number"
            placeholder="Enter deductions"
            value={payrollData.deductions}
            onChange={(e) => setPayrollData({ ...payrollData, deductions: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Total Salary:</FormLabel>
          <Input
            type="number"
            placeholder="Enter total salary"
            value={payrollData.totalSalary}
            onChange={(e) => setPayrollData({ ...payrollData, totalSalary: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleCreatePayrollReport}>
          Create Payroll Report
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePayrollReport;
