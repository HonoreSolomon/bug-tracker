import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import BugList from './BugList';
import {
  fetchUserData,
  fetchUserBugs,
} from '../services/apiService';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userBugs, setUserBugs] = useState([]);

  useEffect(() => {
    // Fetch user data from your backend API
    fetchUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Fetch user projects from your backend API

    // Fetch user bugs from your backend API
    fetchUserBugs()
      .then((data) => {
        setUserBugs(data);
      })
      .catch((error) => {
        console.error('Error fetching user bugs:', error);
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
