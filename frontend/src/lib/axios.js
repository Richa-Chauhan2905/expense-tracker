import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

// Function to check if user is authenticated
export const checkAuthStatus = async () => {
    try {
        const response = await axiosInstance.get('/user/me');
        return { isAuthenticated: true, user: response.data };
    } catch (error) {
        return { isAuthenticated: false, user: null };
    }
};