import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:5000",
});

const api = "/api/game";

export const getGame = async () => {
    try {
        const response = await baseAPI.get(`${api}`);

        return response.data.data;
    } catch (error) {
        console.error("actions getGame error", error);
        throw error;
    }
};

export const getGameDetail = async (id) => {
    try {
        console.log(id);
        const response = await baseAPI.get(`${api}/${id}`);

        return response.data.data;
    } catch (error) {
        console.error("actions getGameDetail error", error);
        throw error;
    }
};
