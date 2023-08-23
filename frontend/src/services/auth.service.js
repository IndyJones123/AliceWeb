import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:5000",
});

export const loginUser = async (data) => {
    try {
        const response = await baseAPI.post("/api/auth/login", data);

        return response.data.token;
    } catch (error) {
        console.error("actions login error", error);
        throw error;
    }
};
