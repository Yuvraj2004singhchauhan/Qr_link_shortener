import api from "../api/axios";

export const registerUser = async (userData) => {
    const response = await api.post("users/register/", userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post("users/login/", credentials);
    return response.data;
};

export const refreshToken = async (refresh) => {
    const response = await api.post("users/refresh/", {
        refresh,
    });

    return response.data;
};