import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllResignations as getAllResignationsApi } from "../../services/resignationApi";

const useGetAllResignation = () => {
  const queryClient = useQueryClient(); // Initialize queryClient

  const { data, isLoading } = useQuery({
    queryKey: ["getAllResignations"],
    queryFn: getAllResignationsApi,
    // Automatically refetch when the query key changes
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllResignations"]);
    },
  });

  return {
    data,
    isLoading,
  };
};

export default useGetAllResignation;
