import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import moment from 'moment'; // Import Moment.js

const DashboardUser = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(moment(now).format('HH:mm:ss')); // Format waktu menggunakan Moment.js
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <Box p={4} align="center">
      <Heading as="h2" size="lg" mb={4}>
        Hai User
      </Heading>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Text fontSize="2xl">Current Time:</Text>
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          {currentTime}
        </Text>
        <Button colorScheme="green" size="lg">
          Clock In
        </Button>
        <Button colorScheme="red" size="lg" ml={4}>
          Clock Out
        </Button>
      </Box>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Heading as="h2" size="lg" mb={2}>
          Salary Information
        </Heading>
        <Text>Your Current Salary: $5000</Text>
      </Box>

      <Box p={4} bg="black" boxShadow="md" borderRadius="md" w="100%" mb={4}>
        <Heading as="h2" size="lg" mb={2}>
          Update Profile
        </Heading>
        <Button colorScheme="blue" size="lg" w="100%">
          Update Profile
        </Button>
      </Box>
      <Button colorScheme="red" size="lg" mt={4} onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
};

export default DashboardUser;
