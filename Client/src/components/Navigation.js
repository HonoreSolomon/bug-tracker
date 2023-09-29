import React from 'react';
import { Box, Anchor, Text } from 'grommet';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Box direction='row' gap='medium'>
      <Link to='/bugs'>
        <Anchor>
          <Text size='large'>Bug List</Text>
        </Anchor>
      </Link>
      <Link to='/projects'>
        <Anchor>
          <Text size='large'>Projects</Text>
        </Anchor>
      </Link>
    </Box>
  );
}

export default Navigation;
