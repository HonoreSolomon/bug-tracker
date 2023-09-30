import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import {
  useParams,
  useHistory,
  Link,
} from 'react-router-dom';
import {
  fetchBugDetails,
  deleteBug,
} from '../services/api';

function BugDetail() {
  const history = useHistory();
  const { id } = useParams();
  const [bug, setBug] = useState(null);

  useEffect(() => {
    //fetch bug details when the component mounts
    const fetchData = async () => {
      try {
        const bugDetails = await fetchBugDetails(id);
        setBug(bugDetails.data);
      } catch (error) {
        console.error('Error fetching bug details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteBug = async () => {
    try {
      await deleteBug(id);

      history.push('/bugs');
    } catch (error) {
      console.error('Error deleting bug', error);
    }
  };

  return (
    <Box pad='medium'>
      <Heading level='2'>Bug Details</Heading>
      {bug ? (
        <Box pad='medium'>
          <Heading level='3'>{bug.title}</Heading>
          <Text>Status: {bug.status}</Text>
          <Text>Description: {bug.description}</Text>
        </Box>
      ) : (
        <Text>Loading bug details... </Text>
      )}
      <Link to={`/bugs/${id}/edit`}>
        <Button
          label='Edit'
          primary
          margin={{ top: 'medium' }}
        />
      </Link>
      <Button
        label='Delete'
        color='status-critical'
        margin={{ top: 'medium' }}
        onClick={handleDeleteBug}
      />
      <Box pad='medium'>
        <Link to='/bugs'>
          <Button label='Go Back' />
        </Link>
      </Box>
    </Box>
  );
}

export default BugDetail;
