import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login.jsx';
import DashboardUser from './pages/Landing/dashboardUser.jsx';
import DashboardAdmin from './pages/Landing/dashboardAdmin.jsx';
import ChangeIdentityForm from './components/dashboardUser/changeIdentity.jsx';

function App() {
  return (
    <ChakraProvider>
      <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/dashboard-user" element={<DashboardUser />} />
          <Route path="/change-identity/:token" element={<ChangeIdentityForm />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
