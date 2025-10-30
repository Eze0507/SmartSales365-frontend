import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const catalogoApi = axios.create({baseURL: API_URL, headers: {'Content-Type': 'application/json',},});

catalogoApi.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);