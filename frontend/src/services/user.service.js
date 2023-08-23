import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:5000",
});

export const getAllUsers = async () => {
    try {
        const response = await baseAPI.get("/api/users");

        return response.data.data;
    } catch (error) {
        console.error("actions getAllUsers error", error);
        throw error;
    }
};

export const getDetail = async (id) => {
    try {
        const response = await baseAPI.get(`/api/users/detail/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error("actions getDetail error", error);
        throw error;
    }
};

export const updateUser = async (data, id) => {
    try {
        const response = await baseAPI.put(`/api/users/update/${id}`, data);

        return response.data.data;
    } catch (error) {
        console.error("actions updateUser error", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await baseAPI.delete(`/api/users/delete/${id}`);

        return response.data.data;
    } catch (error) {
        console.error("actions deleteUser error", error);
        throw error;
    }
};
