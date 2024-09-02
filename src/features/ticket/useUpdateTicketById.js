import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { UpdateById } from "../../services/ticketApi";

const useUpdateTicketById = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTicket, isPending: isUpdatePending } = useMutation({
    mutationFn: (values) => UpdateById(values),
    onSuccess: () => {
      message.success("Ticket Updated!!");
      queryClient.invalidateQueries(["getAssigneeById"]);
      queryClient.invalidateQueries(["getTicketByEmpId"]);
    },
    onError: (err) => {
      console.log(err);
      message.error(err.response.data.error);
    },
  });

  return {
    updateTicket,
    isUpdatePending,
  }
};

export default useUpdateTicketById;
