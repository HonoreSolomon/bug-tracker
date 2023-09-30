import React, { useState, useEffect } from 'react';
import { Box, DataTable, Heading, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { fetchUserBugs } from '../services/apiService';
import { Add } from 'grommet-icons';

function BugList() {
  const [bugs, setUserBugs] = useState([]);

  useEffect(() => {
    //fetch bugs when the component mounts
    const fetchData = async () => {
      try {
        const userBugs = await fetchUserBugs();
        setUserBugs(userBugs); //API returns array of bugs
      } catch (error) {
        console.error('Error fetching bugs', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Heading level='2'>Bug List</Heading>
      <DataTable
        columns={[
          {
            property: 'id',
            header: 'ID',
          },
          {
            property: 'title',
            header: 'Title',
          },
          {
            property: 'description',
            header: 'Description',
          },
          {
            property: 'status',
            header: 'Status',
          },
          {
            property: 'actions',
            header: 'Actions',
            render: (bug) => (
              <Link to={`/bugs/${bug.id}`}>
                <Button label='View' />
              </Link>
            ),
          },
        ]}
        data={bugs}
      />
      <Link to='/bugs/new'>
        <Button
          label='Create New Bug'
          primary
          icon={<Add />}
          size='small'
          margin={{ top: 'medium' }}
        />
      </Link>
    </Box>
  );
}

export default BugList;
