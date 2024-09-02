import { useQuery } from "@tanstack/react-query";
import { getAssigneeById } from "../../services/ticketApi";

const useGetAssigneeById = () => {
  const { data, ispending } = useQuery({
    queryKey: ["getAssigneeById"],
    queryFn: getAssigneeById,
  });
  return {
    data,
    ispending,
  };
};

export default useGetAssigneeById;
