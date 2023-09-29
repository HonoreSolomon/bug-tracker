import React, { useState } from 'react';
import {
  Form,
  FormField,
  TextInput,
  Select,
  Button,
  Box,
  Heading,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import { createBug } from '../services/api';
import { AddCircle } from 'grommet-icons';

function BugForm() {
  const history = useHistory();
  const [bugData, setBugData] = useState({
    title: '',
    description: '',
    status: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await createBug(bugData);
      console.log('Bug Created:', response.data);
      //Recdirect to bugs list after creating\
      history.push('/bugs');
    } catch (error) {
      console.error('Error creating bug', error);
    }
  };

  return (
    <Box pad='medium'>
      <Heading level='2'>Create Bug</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField name='title' label='Title'>
          <TextInput
            name='title'
            value={bugData.title}
            onChange={(e) =>
              setBugData({
                ...bugData,
                title: e.target.value,
              })
            }
            required
          />
        </FormField>
        <FormField name='description' label='Description'>
          <TextInput
            name='description'
            value={bugData.description}
            onChange={(e) =>
              setBugData({
                ...bugData,
                description: e.target.value,
              })
            }
            required
          />
        </FormField>
        <FormField name='status' label='Status'>
          <Select
            name='status'
            options={[
              'New',
              'In Progress',
              'Resolved',
              'Closed',
            ]}
            value={bugData.status}
            onChange={({ option }) =>
              setBugData({
                ...bugData,
                status: option,
              })
            }
            required
          />
        </FormField>
        <Box margin={{ top: 'medium' }}>
          <Button
            type='submit'
            label='Create Bug'
            primary
            icon={<AddCircle />}
          />
        </Box>
      </Form>
    </Box>
  );
}

export default BugForm;
