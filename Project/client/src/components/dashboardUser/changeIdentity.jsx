import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ChangeIdentityForm = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];

  const [identityData, setIdentityData] = useState({
    password: '',
    fullname: '',
    birthdate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  const handlePasswordChange = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character'
      );
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleChangeIdentity = async () => {
    if (!handlePasswordChange(identityData.password)) {
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:8000/auth/update`, identityData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = response.data;

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Update berhasil!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        window.location.href = '/login'; // Mengarahkan ke halaman login setelah berhasil
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Link ini hanya sekali pakai ya',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast({
        title: 'Error',
        description: 'Link ini hanya sekali pakai ya',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} bg="black" borderRadius="md">
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={identityData.password}
            onChange={(e) =>
              setIdentityData({ ...identityData, password: e.target.value })
            }
            pr="4.5rem"
          />
          <Button
            size="sm"
            variant="outline"
            position="absolute"
            right="0.5rem"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </FormControl>
        <FormControl>
          <FormLabel>Full Name:</FormLabel>
          <Input
            type="text"
            placeholder="Enter full name"
            value={identityData.fullname}
            onChange={(e) =>
              setIdentityData({ ...identityData, fullname: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Birthdate:</FormLabel>
          <Input
            type="date"
            value={identityData.birthdate}
            onChange={(e) =>
              setIdentityData({ ...identityData, birthdate: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleChangeIdentity}>
          Update Identity
        </Button>
      </VStack>
    </Box>
  );
};

export default ChangeIdentityForm;
