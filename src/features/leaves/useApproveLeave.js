import toast from "react-hot-toast";
import { leaveapproved as leaveapprovedApi } from "../../services/leavesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useApproveLeave = () => {
  
  const queryClient = useQueryClient();
  const { mutate: approveLeave, isPending } = useMutation({
    mutationFn: ({leaveId, userId, note  }) =>
      leaveapprovedApi(leaveId, userId, note ),
    mutationKey: "leaveapproved",
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["leaveHistory"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
      console.log(err);
    },
  });
  return { approveLeave, isPending };
};
