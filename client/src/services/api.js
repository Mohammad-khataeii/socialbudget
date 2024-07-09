import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',  // Ensure this URL matches your server's URL
    withCredentials: true,
});

export default api;
