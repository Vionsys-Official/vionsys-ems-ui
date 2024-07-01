import { api } from "./authApi";

export const getAllUserApi = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get('', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}


export const deleteUserApi = async (userId) => {
    const response = await api.delete(`/${userId}`);
    return response.data;
}


export const updateUser = async (values) => {
    const response = await api.patch(`/${values._id}`, values);
    return response.data;
}

export const getUsersBirthdayFromMonth = async () => {
    const response = await api.get(`/birthdays`);
    return response.data;
}