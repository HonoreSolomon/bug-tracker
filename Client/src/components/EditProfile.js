import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Form,
  FormField,
  TextInput,
  FileInput,
  Button,
} from 'grommet';
import { useFirebase } from 'react-redux-firebase';
import {
  updateProfile,
  uploadProfilePhoto,
} from '../services/apiService';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          setUser(authUser);
          setDisplayName(authUser.displayName || '');
          setEmail(authUser.email || '');
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, [firebase]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setPhotoFile(selectedFile);
  };

  const handleUpdateProfile = async () => {
    try {
      let updatedPhotUrl = user.photoURL;

      if (photoFile) {
        updatedPhotUrl = await uploadProfilePhoto(
          user.uid,
          photoFile
        );
      }

      const response = await updateProfile(user.uid, {
        displayName,
        email,
        photoURL: updatedPhotUrl,
      });

      if (response.status === 200) {
        window.location.href = '/profile';
      } else {
        console.error(
          'Profile update failed: ',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box pad='large'>
      <Heading level='2'>Edit Profile</Heading>
      <Form>
        <FormField name='displayName' label='Name'>
          <TextInput
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormField>
        <FormField name='email' label='Email'>
          <TextInput
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField
          name='photoUrl'
          label='Profile Picture Url'
        >
          <FileInput
            type='file'
            onChange={handleFileSelect}
          />
        </FormField>
        <Button
          label='Update Profile'
          primary
          onClick={handleUpdateProfile}
          margin={{ top: 'medium' }}
        />
      </Form>
    </Box>
  );
};

export default EditProfile;
