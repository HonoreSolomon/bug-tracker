import React from 'react';
import { Box, Menu } from 'grommet';
import { useLocation, useHistory } from 'react-router-dom';

function Navigation() {
  //useLocation hook to get current pathname
  const location = useLocation();
  const history = useHistory();

  const handleBugListClick = () => {
    history.push('/bugs');

    // fetchBugs()
    //   .then((bugs) => {
    //     setBugs(bugs);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching bugs', error)
    //   });
  };

  const handleProjectManagerClick = () => {
    history.push('/projects');
  };

  // const handleSettingsClick = () => {
  //   setShowSettingsModal(true);
  // }
  return (
    <Box>
      <Menu
        label='menu'
        items={[
          {
            label: 'Bug List',
            onClick: handleBugListClick,
            active: location.pathname === '/bugs',
            href: '/bugs',
          },
          {
            label: 'Project Manager',
            onClick: handleProjectManagerClick,
            active: location.pathname === '/projects',
            href: '/projects',
          },
          {
            label: 'Settings',
            // onClick: handleSettingsClick,
            active: location.pathname === '/settings',
            href: '/settings',
          },
        ]}
      />
    </Box>
  );
}

export default Navigation;
