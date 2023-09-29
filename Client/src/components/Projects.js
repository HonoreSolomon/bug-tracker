import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { fetchUserProjects } from '../services/projectService';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // fetch user data when component mounts
    const fetchData = async () => {
      try {
        const userProjects = await fetchUserProjects();
        setProjects(userProjects);
      } catch (error) {
        console.error(
          'Error fetching user projects:',
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <Box pad='large'>
      <Heading level='2'>Your Projects</Heading>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Box
            key={project.id}
            margin={{ bottom: 'medium' }}
          >
            <Heading level='3'>{project.name}</Heading>
            <Text>Description: {project.description}</Text>
            <Text>Created: {project.createdDate}</Text>
            <Link to={`/projects/${project.id}`}>
              <Button
                label='View Projedt'
                primary
                margin={{ top: 'small' }}
              />
            </Link>
          </Box>
        ))
      ) : (
        <Text>
          You Do not have any projects. Create one to get
          started.
        </Text>
      )}
      <Link to='/create-project'>
        <Button
          label='Create Project'
          primary
          margin={{ top: 'medium' }}
        />
      </Link>
    </Box>
  );
};

export default Projects;
