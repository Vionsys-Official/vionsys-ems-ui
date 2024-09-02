import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";

const { id } = getUserIdRole();
const token = localStorage.getItem("token");

export const raiseticket = async (ticketData) => {
  // const query = new QueryClient();
  console.log(ticketData)
  const response = await api.post(`/ticket/raiseTicket`, ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getTicketByEmpId = async () => {
  const response = await api.get(`/ticket/getAll/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getAssigneeById = async (id) => {
  const response = await api.get(`/ticket/findByAssignedToUid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const UpdateById = async () => {
  const response = await api.update(`/ticket/updateById/${id}`, {
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
