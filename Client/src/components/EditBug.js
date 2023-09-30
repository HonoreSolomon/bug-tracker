import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Form,
  FormField,
  TextInput,
  Select,
  Button,
} from 'grommet';
import { useParams, useHistory } from 'react-router-dom';
import {
  fetchBugDetails,
  updateBug,
} from '../services/apiService';

function EditBug() {
  const { bugId } = useParams();
  const history = useHistory();
  const [bugData, setBugData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bugDetails = await fetchBugDetails(bugId);
        setBugData(bugDetails);
      } catch (error) {
        console.error('Error fetching bug details:', error);
      }
    };
    fetchData();
  }, [bugId]);

  const handleSubmit = async () => {
    try {
      await updateBug(bugId, bugData);

      history.push(`/bugs/${bugId}`);
    } catch (error) {
      console.error('Error updating bug:', error);
    }
  };

  return (
    <Box pad='large'>
      <Heading level='2'>Edit Bug</Heading>
      {bugData ? (
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
                setBugData({ ...bugData, status: option })
              }
              required
            ></Select>
          </FormField>

          <Box margin={{ top: 'medium' }}>
            <Button
              type='submit'
              label='Save Change'
              primary
            />
          </Box>
        </Form>
      ) : (
        <Text>Loading bug details...</Text>
      )}
    </Box>
  );
}

export default EditBug;
