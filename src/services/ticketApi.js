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
  const response = await api.get(`/ticket/findByEmpId/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAssigneeTicketsById = async (id) => {
  const response = await api.get(`/ticket/findByAssignedToUid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
export const UpdateById = async (values) => {
  const response = await api.patch(`/ticket/updateById/${values.id}`, values, {
    header: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
