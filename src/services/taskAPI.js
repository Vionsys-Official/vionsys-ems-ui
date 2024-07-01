import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";

export const createTask = async (values) => {
    const token = localStorage.getItem("token");
    const response = await api.post('/task/create', values, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateTaskCompleted = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/task/completed/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateTaskStarted = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/task/started/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getTasksFromUserId = async () => {
    const { id } = getUserIdRole();
    const token = localStorage.getItem("token");
    const response = await api.get(`/task/findAll/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}

export const updateStartTask = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/task/started/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateCompletedTask = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/task/completed/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getAllTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/task/getAll", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.data;
}