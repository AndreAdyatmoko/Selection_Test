import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Alert, AlertIcon, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import moment from 'moment';
import PayrollPage from '../../components/dashboardUser/generatePayment';
import axios from 'axios';

const DashboardUser = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [clockInSuccess, setClockInSuccess] = useState(false);
  const [clockOutSuccess, setClockOutSuccess] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [username, setUsername] = useState('');
  const [earlyClockOutAlert, setEarlyClockOutAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(moment(now).format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUsername();
    fetchAttendanceHistory();
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/user/profile',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUsername(response.data.username);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const handleClockIn = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/attendance/clock-in',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.message === 'Clock in successful') {
        setClockInSuccess(true);
        setTimeout(() => {
          setClockInSuccess(false);
        }, 3000); // Hapus pesan setelah 3 detik
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClockOut = async () => {
    const lastAttendance = attendanceHistory[attendanceHistory.length - 1];
    const clockInTime = lastAttendance.clockIn;
    const clockOutTime = new Date();
    const workHours = (clockOutTime - clockInTime) / (1000 * 60 * 60);
  
    if (workHours >= 7) {
      try {
        const responseClockOut = await axios.post(
          'http://localhost:8000/attendance/clock-out',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        if (responseClockOut.data.message === 'Clock out successful') {
          setClockOutSuccess(true);
          setTimeout(() => {
            setClockOutSuccess(false);
          }, 3000); // Hapus pesan setelah 3 detik
        }
      } catch (error) {
        console.error('An error occurred during clock out:', error);
      }
    } else {
      setEarlyClockOutAlert(true);
      setTimeout(() => {
        setEarlyClockOutAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, [clockInSuccess, clockOutSuccess]);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/attendance/history',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setAttendanceHistory(response.data.attendanceHistory);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <Box p={4} align="center">
      <Heading as="h2" size="lg" mb={4}>
        Selamat Bekerja dan Sehat selalu
      </Heading>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Text fontSize="2xl">Current Time:</Text>
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {currentTime}
        </Text>
        <Button colorScheme="green" size="lg" onClick={handleClockIn}>
          Clock In
        </Button>
        <Button colorScheme="red" size="lg" ml={4} onClick={handleClockOut}>
          Clock Out
        </Button>
        {clockInSuccess && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            Clock in successful!
          </Alert>
        )}
        {clockOutSuccess && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            Clock out successful!
          </Alert>
        )}
        {earlyClockOutAlert && (
          <Alert status="warning" mt={4} >
            <AlertIcon />
            Ini masih jam kerja, minimal kerja 7 jam sebelum clock out.
          </Alert>
        )}
      </Box>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Heading as="h2" size="lg" mb={2}>
          Rekap Absen
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Clock In</Th>
              <Th>Clock Out</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendanceHistory.map((attendance, index) => (
              <Tr key={index}>
                <Td>{attendance.User.fullname}</Td>
                <Td>
                  {attendance.clockIn
                    ? moment(attendance.clockIn).format("YYYY-MM-DD HH:mm:ss")
                    : "Not yet"}
                </Td>
                <Td>
                  {attendance.clockOut
                    ? moment(attendance.clockOut).format("YYYY-MM-DD HH:mm:ss")
                    : "Not yet"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Text fontSize="2xl">Generate Payment</Text>
          <PayrollPage/>
      </Box>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
      </Box>
      <Button colorScheme="red" size="lg" mt={4} onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
};

export default DashboardUser;
