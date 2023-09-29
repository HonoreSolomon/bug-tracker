import React from 'react';
import { Box, Text, Paragraph } from 'grommet';

function Comment({ author, text }) {
  return (
    <Box
      pad='medium'
      background='light-2'
      margin='small'
      round='small'
    >
      <Text weight='bold'>{author}</Text>
      <Paragraph margin={{ top: 'small' }}>
        {text}
      </Paragraph>
    </Box>
  );
}

export default Comment;
