import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accesstoken = localStorage.getItem("token");
        if (!accesstoken) {
            config.headers.Authorization = `Barear ${accesstoken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            if(error.response.status === 401) {
                window.location.href = "/login"
            }else if (error.response === 500) {
                console.error("server error try later");
            }
        }else if(error.code === "ECONNABORTED"){
            console.error("request timeout try agian");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;