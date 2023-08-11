import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Handle successful login, e.g., redirect to dashboard
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto" bg="black" boxShadow="lg" borderRadius="md" mt={"32"}>
      <VStack spacing={4} align="center">
        <Heading as="h2" size="xl" mb={4}>
          Log In
        </Heading>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <FormControl id="email">
            <FormLabel color="white">Email Address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          {errorMessage && (
            <Alert status="error" w="100%">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}
          <Button type="submit" colorScheme="blue" w="100%">
            Log In
          </Button>
        </form>
        <Text fontSize="md">
          Don't have an account?{" "}
          <Text as="span" color="blue.500">
            Sign up here
          </Text>
        </Text>
      </VStack>
    </Box>
  );
}

export default Login;
