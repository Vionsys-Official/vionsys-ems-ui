import { useQuery } from "@tanstack/react-query";
import { useGetTicketByEmpId as GetTicketByEmpIdApi } from "../../services/ticketApi";

export const useGetTicketByEmpId = () => {
  //   const queryClient = new QueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["getTicketByEmpId"],
    queryFn: GetTicketByEmpIdApi,
  });
  return {
    data,
    isPending,
  };
};
export default useGetTicketByEmpId;
// Currently in update dont make any changes