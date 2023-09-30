import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import BugList from './BugList';
import { fetchUserData } from '../services/apiService';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from your backend API
    fetchUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Box pad='medium'>
      <Heading level='2'>User Dashboard</Heading>
      {userData && (
        <Box>
          <Text>
            Welcome, {userData.displayName || 'User'}!
          </Text>
          <Text>Email: {userData.email}</Text>
        </Box>
      )}
      <Link to='/edit-profile'>
        2
        <Button label='Edit Profile' primary />
      </Link>
      <Projects />
      <BugList />
    </Box>
  );
};

export default Dashboard;
