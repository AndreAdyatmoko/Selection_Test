import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Inisialisasi useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.roleId === 1) {
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-user");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue" w="100%" mt={"10"}>
            Log In
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default Login;
