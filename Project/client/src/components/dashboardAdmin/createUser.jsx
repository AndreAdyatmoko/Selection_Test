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

const CreateUserForm = () => {
  const toast = useToast();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullname: '',
    birthdate: '',
    joinDate: '',
    roleId: 2,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleCreateUser = async () => {
    // Add validation logic here if needed

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Display success toast
        toast({
          title: 'Success',
          description: 'User created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setNewUser({
          email: '',
          password: '',
          fullname: '',
          birthdate: '',
          joinDate: '',
          roleId: 2,
          basedsalary: '',
        });
        setErrorMessage('');
      } else {
        // Display error toast
        toast({
          title: 'Error',
          description: data.message || 'An error occurred while creating user',
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
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
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
            value={newUser.fullname}
            onChange={(e) =>
              setNewUser({ ...newUser, fullname: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Birthdate:</FormLabel>
          <Input
            type="date"
            value={newUser.birthdate}
            onChange={(e) =>
              setNewUser({ ...newUser, birthdate: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Based Salary:</FormLabel>
          <Input
            type="number"
            value={newUser.basedsalary}
            onChange={(e) =>
              setNewUser({ ...newUser, basedsalary: e.target.value })
            }
          />
        </FormControl> 
        <FormControl>
          <FormLabel>Join Date:</FormLabel>
          <Input
            type="date"
            value={newUser.joinDate}
            onChange={(e) =>
              setNewUser({ ...newUser, joinDate: e.target.value })
            }
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleCreateUser}>
          Create Employee
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateUserForm;
