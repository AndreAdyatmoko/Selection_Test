import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login/login.jsx';

function App() {
  return (
    <ChakraProvider>
      <div>
          <Login /> 
      </div>
    </ChakraProvider>
  );
}

export default App;
