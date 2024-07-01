import { useQuery } from "@tanstack/react-query";
import { getUserLeaveHistory as getUserLeaveHistoryApi } from "../../services/leavesApi";

const useGetUserLeaveHistory = (userId) => {
  const { isPending, data } = useQuery({
    queryKey: ["userLeaveHistory"],
    queryFn: () => getUserLeaveHistoryApi(userId),
  });
  return { isPending, data };
};

export default useGetUserLeaveHistory;
