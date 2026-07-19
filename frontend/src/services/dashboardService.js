import api from "../api/axios";

export const getDashboardData = async () => {
    const response = await api.get("dashboard/");
    return response.data;
};

export const getDashboardAnalytics = async () => {
    const response = await api.get("dashboard-analytics/");
    return response.data;
};