import axios from 'axios';
import store from '../store';

const api = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true
});

// Дописываем токен на каждый запрос, если он сохранен в store
api.interceptors.request.use(config => {
    const token = store.state.auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
