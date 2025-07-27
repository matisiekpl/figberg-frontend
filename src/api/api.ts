import axios from "axios";
import {Config} from "@/config.ts";
import {jwtDecode} from "jwt-decode";

const api = axios.create({
    baseURL: Config.serverUrl + '/api/',
});

api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decoded = jwtDecode(token) as { exp: number };
            const currentTime = Date.now() / 1000;
            if (decoded && decoded.exp < currentTime)
            {
                localStorage.removeItem('access_token');
                window.location.href = '/login';
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);

export default api;