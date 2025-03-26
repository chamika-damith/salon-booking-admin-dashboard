import axios from "axios";

const API_URL = "https://salon-booking-backend-oxwm.onrender.com/auth";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    }
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
    role?: string;
}

const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);

            if (response.data.token) {
                // Store JWT token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    register: async (userData: RegisterCredentials): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);

            if (response.data.token) {
                // Store JWT token in localStorage after successful registration
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    getToken: () => {
        return localStorage.getItem("token");
    }
};

export default authService;