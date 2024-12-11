import axios from 'axios';

// Configure Axios defaults
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
axios.defaults.baseURL = 'https://harmonymusicbackend.vercel.app'; // Replace with your backend's URL

export default axios;
