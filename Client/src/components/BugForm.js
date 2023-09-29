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
import { AddCircle } from 'grommet-icons';

function BugForm({ onSubmit }) {
  const [bugData, setBugData] = useState({
    title: '',
    description: '',
    status: 'Open',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bugData);
  };

  return (
    <Box pad='medium'>
      <Heading level='2'>Create Bug</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField label='Title'>
          <TextInput
            name='title'
            value={bugData.title}
            onChange={(e) =>
              setBugData({
                ...bugData,
                title: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label='Description'>
          <TextInput
            name='description'
            value={bugData.description}
            onChange={(e) =>
              setBugData({
                ...bugData,
                description: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label='Status'>
          <Select
            name='status'
            options={['Open', 'In Progress', 'Closed']}
            value={bugData.status}
            onChange={({ option }) =>
              setBugData({
                ...bugData,
                status: option,
              })
            }
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
