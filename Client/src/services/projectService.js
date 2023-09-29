import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // replace this is a placeholder

export const fetchUserProjects = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/user/projects`
    );
    return response.data.projects;
  } catch (error) {
    throw error;
  }
};
