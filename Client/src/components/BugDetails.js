import React, { useState, useEffect } from 'react';
import { Box, Heading, Paragraph, Button } from 'grommet';
import { useParams, Link } from 'react-router-dom';
import { fetchBugDetails } from '../services/api';

function BugDetail() {
  const { bugId } = useParams();
  const [bug, setBug] = useState(null);

  useEffect(() => {
    //fetch bug details when the component mounts
    const fetchData = async () => {
      try {
        const bugDetails = await fetchBugDetails(bugId);
        setBug(bugDetails.data);
      } catch (error) {
        console.error('Error fetching bug details:', error);
      }
    };

    fetchData();
  }, [bugId]);

  return (
    <Box pad='large'>
      <Heading level='2'>Bug Details</Heading>
      {bug ? (
        <Box pad='medium'>
          <Heading level='3'>{bug.title}</Heading>
          <Paragraph>Status: {bug.status}</Paragraph>
          <Paragraph>
            Description: {bug.description}
          </Paragraph>
        </Box>
      ) : (
        <Paragraph>Loading bug details... </Paragraph>
      )}
      <Link to={`/bugs/${bugId}/edit`}>
        <Button
          label='Edit'
          primary
          margin={{ top: 'medium' }}
        />
      </Link>
      <Box pad='medium'>
        <Link to='/bugs'>
          <Button label='Go Back' />
        </Link>
      </Box>
    </Box>
  );
}

export default BugDetail;
