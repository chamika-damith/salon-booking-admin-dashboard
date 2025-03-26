import axios from "axios";
import authService from "./authService";

// Create axios instance for API requests
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add request interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = authService.getToken();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (expired token)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Logout the user if token is expired
            authService.logout();

            // Redirect to login page
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;