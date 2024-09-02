import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket as updateTicketApi } from "../../services/ticketApi";
import toast from "react-hot-toast";

const useUpdateTicketById = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTicket, ispending } = useMutation({
    mutationFn: (ticketdata) => updateTicketApi(ticketdata),
    onSuccess: () => {
      toast.success("Task assigned successfully!!!");
      queryClient.invalidateQueries(["updateById"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.response.data.error);
    },
  });
  return {
    updateTicket,
    ispending,
  };
};

export default useUpdateTicketById;
