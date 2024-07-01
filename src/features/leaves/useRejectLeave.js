import toast from "react-hot-toast";
import { leaverejected as leaverejectedApi } from "../../services/leavesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRejectLeave = () => {
  const queryClient = useQueryClient();
  const { mutate: rejectLeave, isPending: reajectPending } = useMutation({
    mutationFn: ({ leaveId, userId, note }) =>
      leaverejectedApi(leaveId, userId, note),
    mutationKey: "leaveapproved",
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["leaveHistory"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { rejectLeave, reajectPending };
};
