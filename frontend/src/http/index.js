import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8000/api/v1/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('token'))
        config.headers.Authorization = 'Token ' + localStorage.getItem('token')
    return config
});

export default $api