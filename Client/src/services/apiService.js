import axios from 'axios';
import { Storage } from '/firebase';

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
