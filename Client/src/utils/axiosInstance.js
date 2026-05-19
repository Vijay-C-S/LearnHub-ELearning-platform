// Client/src/utils/axiosInstance.js
import axios from 'axios';

/**
 * Reusable Axios instance with interceptors configured
 * Use this instead of creating new axios instances
 */
const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Add any global request modifications here
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('studentToken');
            localStorage.removeItem('instructorToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
