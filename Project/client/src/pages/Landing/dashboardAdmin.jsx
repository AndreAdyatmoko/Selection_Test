import React, { useState } from 'react';
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import CreateUser from '../../components/dashboardAdmin/createUser';
import DashboardSalary from '../../components/dashboardAdmin/reportPayroll';
import PayrollReport from '../../components/dashboardAdmin/createPayroll'

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
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Hai Admin Selamat Bekerja Sehat Selalu ya
      </Text>
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
            Dashboard Employee Salary
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
            <DashboardSalary />
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
