import { useMutation } from "@tanstack/react-query";
import { raiseticket as raiseTicketApi } from "../../services/ticketApi";
import toast from "react-hot-toast";
import { message } from "antd";

export const useCreateTicket = () => {
  const { mutate: raiseTicket, isPending } = useMutation({
    mutationFn: (ticketdata) => raiseTicketApi(ticketdata),
    onSuccess: () => {
      message.success("Ticket Raised successfully!!!");
      queryClient.invalidateQueries(["getAssigneeById"]);
      queryClient.invalidateQueries(["getTicketByEmpId"]);

    },
    onError: (err) => {
      console.log(err);
      message.error(err.response.data.error);
    },
  });
  return {
    raiseTicket,
    isPending,
  };
};
export default useCreateTicket;
