import api from "../api/axios";

export const getMyLinks = async (search = "", page = 1) => {

    const response = await api.get("/my-links/", {
        params: {
            search,
            page,
        },
    });

    return response.data;
};

export const createLink = async (data) => {

    const response = await api.post(
        "/create/",
        data
    );

    return response.data;
};

export const deleteLink = async (id) => {

    const response = await api.delete(
        `/delete/${id}/`
    );

    return response.data;
};

export const updateLink = async (id, data) => {

    const response = await api.put(
        `links/${id}/`,
        data
    );

    return response.data;
};