import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Alert, AlertIcon } from '@chakra-ui/react';
import moment from 'moment';
import axios from 'axios';

const DashboardUser = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [clockInSuccess, setClockInSuccess] = useState(false);
  const [clockOutSuccess, setClockOutSuccess] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [username, setUsername] = useState('');

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
    try {
      const response = await axios.post(
        'http://localhost:8000/attendance/clock-out',
        {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.data.message === 'Clock out successful') {
        setClockOutSuccess(true);
        setTimeout(() => {
          setClockOutSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

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
        Hai {username}
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
      </Box>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Heading as="h2" size="lg" mb={2}>
          History Attendance
        </Heading>
        {attendanceHistory.map((attendance, index) => (
          <Box
            key={index}
            p={4}
            border="1px solid gray"
            borderRadius="md"
            mb={4}
            boxShadow="md"
          >
            <Text fontSize="xl" fontWeight="bold">
              Name: {attendance.User.fullname}
            </Text>
            <Text mt={2}>
              Clock In: {moment(attendance.clockIn).format('YYYY-MM-DD HH:mm:ss')}
              <br />
              Clock Out:{' '}
              {attendance.clockOut
                ? moment(attendance.clockOut).format('YYYY-MM-DD HH:mm:ss')
                : 'Not yet'}
            </Text>
          </Box>
        ))}
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
