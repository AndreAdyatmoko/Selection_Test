import React, { useState } from 'react';
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import CreateUser from '../../components/dashboardAdmin/createUser';
import CreatePayrollReport from '../../components/dashboardAdmin/reportPayroll';

const DashboardAdmin = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
      <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)} isLazy>
        <TabList justifyContent="center" borderBottom="1px solid" borderColor="gray.200">
          <Tab
            _selected={{ color: 'white', bg: 'teal.500' }}
            _focus={{ boxShadow: 'none' }}
            _hover={{ bg: 'teal.200', color: 'white' }}
            px={8}
            py={4}
            fontSize="lg"
            fontWeight="bold"
            borderRadius="md"
          >
            Payroll Reports
          </Tab>
          <Tab
            _selected={{ color: 'white', bg: 'purple.500' }}
            _focus={{ boxShadow: 'none' }}
            _hover={{ bg: 'purple.200', color: 'white' }}
            px={8}
            py={4}
            fontSize="lg"
            fontWeight="bold"
            borderRadius="md"
          >
            Create New Employee
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CreatePayrollReport /> {/* Add the CreatePayrollReport component here */}
          </TabPanel>
          <TabPanel>
            <CreateUser />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button colorScheme="red" size="lg" mt={4} onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
};

export default DashboardAdmin;
