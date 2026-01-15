import axios from 'axios';

// 1. Base URL set karna (Baar baar localhost:3000 likhne ki zarurat nahi)
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// 2. INTERCEPTOR (The Security Guard) 🛡️
// Ye function har request bhejne se PEHLE run hoga.
api.interceptors.request.use((config) => {
    // LocalStorage se chupke se Token nikalo
    const token = localStorage.getItem('token');
    
    // Agar Token hai, to Header mein daal do
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
