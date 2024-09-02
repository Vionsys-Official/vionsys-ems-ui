import { useQuery } from "@tanstack/react-query";
import { getResignationById as getResignationByIdAPI } from "../../services/resignationApi";

const useGetResignationById = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getResignationById", userId],
    queryFn: () => getResignationByIdAPI(userId),
    enabled: !!userId, // Only run the query if userId is available
  });
  return {
    data,
    isLoading,
  };
};

export default useGetResignationById;
