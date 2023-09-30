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
        const response = await fetchBugDetails(bugId);
        setBug(response.data);
      } catch (error) {
        console.error('Error fetching bug details:', error);
      }
    };

    fetchData();
  }, [bugId]);

  if (!bug) {
    return <div>Loading...</div>;
  }

  return (
    <Box pad='medium'>
      <Heading level='2'>{bug.title}</Heading>
      <Paragraph>Status: {bug.status}</Paragraph>
      <Paragraph>Description: {bug.description}</Paragraph>
      <Box margin={{ top: 'medium' }}>
        <Link to='/bugs'>
          <Button label='Go Back' />
        </Link>
      </Box>
    </Box>
  );
}

export default BugDetail;
