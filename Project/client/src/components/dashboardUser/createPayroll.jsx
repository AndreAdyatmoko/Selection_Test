import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';

const CreatePayrollReport = () => {
  const [userId, setUserId] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreatePayrollReport = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/payroll/create',
        {
          userId,
          month: parseInt(month),
          year: parseInt(year),
          baseSalary: parseFloat(baseSalary),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.message === 'Laporan gaji berhasil dibuat') {
        setSuccessMessage('Laporan gaji berhasil dibuat.');
        setErrorMessage('');
        setUserId('');
        setMonth('');
        setYear('');
        setBaseSalary('');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Terjadi kesalahan saat melakukan pengecekan Gaji');
      console.error('An error occurred:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Cek detail Gaji Mu disini ya 
      </Heading>

      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      <FormControl mb={4}>
        <FormLabel>Nama Karyawan</FormLabel>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Masukkan Namamu disini"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Bulan</FormLabel>
        <Input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Masukkan bulan (1-12)"
          min="1"
          max="12"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Tahun</FormLabel>
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Masukkan tahun"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Detail Gaji</FormLabel>
        <Input
          type="number"
          value={baseSalary}
          onChange={(e) => setBaseSalary(e.target.value)}
          placeholder="Masukkan gaji pokok"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleCreatePayrollReport}>
        Cek Riwatat Gaji
      </Button>
    </Box>
  );
};

export default CreatePayrollReport;
