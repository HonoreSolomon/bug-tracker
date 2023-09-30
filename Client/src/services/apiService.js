import axios from 'axios';
import { Storage } from '/firebase';

const BASE_URL = 'http://localhost:5000'; // replace this is a placeholder
const API_URL = 'http://example.com/api/bugs'; //placeholder will need to complet API endpoint url

const api = axios.create({
  baseUrl: BASE_URL,
});

export const updateBug = async (bugId, bugData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bugs/${bugId}`,
      bugData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBug = async (bugData) => {
  try {
    const response = await axios.post(API_URL, bugData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBugDetails = async (bugId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bugs/${bugId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

export const fetchUserBugs = async (userId) => {
  try {
    const response = await api.get(
      `/bugs?userID=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePhoto = async (userId, file) => {
  try {
    const photoRef = Storage.ref().child(
      'profilePhotos/${userId'
    );

    await photoRef.put(file);

    const photoURL = await photoRef.getDownloadURL();

    return photoURL;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw error;
  }
};

const apiService = axios.create({
  baseURL: '/api', // placeholder for backend api base url
  timeout: 10000,
});

apiService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const updateProfile = (userId, profileData) => {
  return apiService.put(
    `/user/profile/${userId}`,
    profileData
  );
};

export default apiService;
