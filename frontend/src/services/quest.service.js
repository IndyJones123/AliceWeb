import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:5000",
});

const api = "/api/quest";

export const getQuest = async (id) => {
    try {
        const response = await baseAPI.get(`${api}/${id}`);

        return response.data.questData;
    } catch (error) {
        console.error("actions getQuest error", error);
        throw error;
    }
};

export const getDetail = async (id) => {
    try {
        const response = await baseAPI.get(`${api}/detail/${id}`);

        return response.data.questData;
    } catch (error) {
        console.error("actions getDetail error", error);
        throw error;
    }
};

export const updateQuest = async (id, data) => {
    try {
        console.log(data);
        const response = await baseAPI.put(`${api}/update/${id}`, data);

        return response.data.questData;
    } catch (error) {
        console.error("actions updateQuest error", error);
        throw error;
    }
};

export const deleteQuest = async (id, data) => {
    try {
        const response = await baseAPI.put(`${api}/delete/${id}`, data);

        return response.data.questData;
    } catch (error) {
        console.error("actions deleteQuest error", error);
        throw error;
    }
};
