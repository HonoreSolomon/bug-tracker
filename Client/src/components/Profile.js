import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Avatar,
} from 'grommet';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { User } from 'grommet-icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <Box pad='large'>
      <Heading level='2'>User Profile</Heading>
      {user ? (
        <>
          <Box align='center'>
            <Avatar
              src={
                user.photoURL ||
                '../default-profile-image.png'
              }
              size='xlarge'
            />
            ({!user.photoURL && <User size='xlarge' />})
            <Text>{user.displayName || 'User'}</Text>
            <Text>Email: {user.email}</Text>
          </Box>
          <Link to='/edit-profile'>
            <Button
              label='Edit Profile'
              primary
              margin={{ top: 'medium' }}
            />
          </Link>
        </>
      ) : (
        <Text>Please log in to view your profile</Text>
      )}
    </Box>
  );
};

export default Profile;
