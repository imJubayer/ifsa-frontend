// import axios from 'axios';

// const axiosService = axios.create({
//     baseURL: 'http://localhost:8000/api/'
// });

// export default axiosService;

import axios from 'axios';
import { BASEURL } from './Constants';

const axiosServices = axios.create({
    baseURL: BASEURL,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
    }
});

// interceptor for http
axiosServices.interceptors.request.use((request) => {
    const token = localStorage.getItem('serviceToken');
    if (token) {
        // eslint-disable-next-line no-underscore-dangle
        request.headers!.Authorization = `Bearer ${token}`;
    }
    return request;
});

// check user login
axiosServices.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== 'core/user-profile/' && err.response) {
            // Access Token was expired
            if (err.response.status === 400) {
                const token = localStorage.getItem('serviceToken');
                if (token) {
                    localStorage.removeItem('serviceToken');
                    window.location.reload();
                }
                return axiosServices(originalConfig);
            }
        }
        return Promise.reject(err);
    }
);

export default axiosServices;
