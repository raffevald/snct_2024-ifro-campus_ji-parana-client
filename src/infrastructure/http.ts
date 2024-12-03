import axios from 'axios';
import Cookies from 'js-cookie';
import AuthService from '../services/AuthService';

import appErrosCodes from '../helpers/constants/appErrosCodes';

const apiBaseUrl = "https://localhost:7060/Api/";

const api = axios.create({
    baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && error.response?.data?.errorMessage !== appErrosCodes.InvalidCredentials ) {
            originalRequest._retry = true;
            const newAccessToken = await AuthService.refreshToken();
            if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
