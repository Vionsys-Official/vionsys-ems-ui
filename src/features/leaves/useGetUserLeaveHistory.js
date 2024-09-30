import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserLeaveHistory as getUserLeaveHistoryApi } from "../../services/leavesApi";

const useGetUserLeaveHistory = (userId) => {
  const queryClient = useQueryClient();
 
  const { isPending, data } = useQuery({
    queryKey: ["userLeaveHistory", userId],  // Include userId in the key to make it unique
    queryFn: () => getUserLeaveHistoryApi(userId),
  });
 
  // Function to invalidate the query and refetch data
  const invalidateLeaveHistory = () => {
    queryClient.invalidateQueries(["userLeaveHistory", userId]);
  };
 
  return { isPending, data, invalidateLeaveHistory };
};

export default useGetUserLeaveHistory;
