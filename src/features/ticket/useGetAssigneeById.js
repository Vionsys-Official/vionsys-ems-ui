import { useQuery } from "@tanstack/react-query";
import { getAssigneeTicketsById } from "../../services/ticketApi";

const useGetAssigneeTicketsById = (id) => {
  const { data, isPending } = useQuery({
    queryKey: ["getAssigneeById"],
    queryFn: () => getAssigneeTicketsById(id),
  });
  return {
    data,
    isPending,
  };
};

export default useGetAssigneeTicketsById;
