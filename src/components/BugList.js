import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from 'grommet';
import { Link } from 'react-router-dom';
import { fetchBugs } from '../services/api';
import { Add } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { Grommet, Main, Heading } from 'grommet';
import './BugList.css';

function BugList() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    //fetch bugs when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetchBugs();
        setBugs(response.data); //API returns array of bugs
      } catch (error) {
        console.error('Error fetching bugs', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grommet theme={grommet}>
      <Main pad='large'>
        <Heading level='2'>Bug List</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Bug ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bugs.map((bug) => (
              <TableRow key={bug.id}>
                <TableCell>{bug.id}</TableCell>
                <TableCell>{bug.title}</TableCell>
                <TableCell>{bug.description}</TableCell>
                <TableCell>{bug.status}</TableCell>
                <TableCell>
                  <Link to={`/bugs/${bug.id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link to='/bugs/new'>
          <Button
            label='create New Bug'
            primary
            icon={<Add />}
            size='small'
            margin={{ top: 'medium' }}
          />
        </Link>
      </Main>
    </Grommet>
  );
}

export default BugList;
