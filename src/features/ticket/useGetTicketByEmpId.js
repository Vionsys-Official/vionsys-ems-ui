import { useQuery } from "@tanstack/react-query";
import { getTicketByEmpId as getTicketByEmpIdApi } from "../../services/ticketApi";

export const useGetTicketByEmpId = () => {
  //   const queryClient = new QueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["getTicketByEmpId"],
    queryFn: getTicketByEmpIdApi,
  });
  return {
    data,
    isPending,
  };
};
export default useGetTicketByEmpId;
// Currently in update dont make any changes