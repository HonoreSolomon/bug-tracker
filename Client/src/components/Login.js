import React, { useState } from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Heading,
} from 'grommet';
import { useFirebase } from 'react-redux-firebase';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const firebase = useFirebase();

  const handleLogin = async () => {
    const { email, password } = credentials;
    try {
      await firebase.login({ email, password });
    } catch (error) {
      console.error('Error Logging in:', error);
    }
  };

  return (
    <Box align='center' justify='center' height='100vh'>
      <Box background='light-2' pad='medium' width='medium'>
        <Heading level='3'>Login</Heading>
        <Form onSubmit={handleLogin}>
          <FormField name='email' label='Email'>
            <TextInput
              name='email'
              value='{credentials.email'
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                })
              }
              required
            />
          </FormField>
          <FormField name='password' label='Password'>
            <TextInput
              name='password'
              value='{credentials.password'
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
              required
            />
          </FormField>
          <Button type='submit' primary label='login' />
        </Form>
      </Box>
    </Box>
  );
};

export default Login;
