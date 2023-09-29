import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { ServerCluster } from 'grommet-icons';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          ServerCluster(authUser);
        } else {
          setUser(null);
        }
      });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <Box pad='large'>
      <Heading level='2'>User Dashboard</Heading>
      {user ? (
        <>
          <Text>
            Welcome, {user.displayName || 'User'}!
          </Text>
          <Text>Email: {user.email}</Text>
          <Link to='/projects'>
            <Button
              label='View Projects'
              primary
              margin={{ top: 'medium' }}
            />
          </Link>
        </>
      ) : (
        <Text>Please Log in to view your dashboard.</Text>
      )}
    </Box>
  );
};

export default Dashboard;
