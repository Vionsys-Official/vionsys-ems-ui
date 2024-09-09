import { cancleleave as cancleleaveApi } from "../../services/leavesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCancleLeaveRequest = () => {
  const query = useQueryClient();
  const { mutate: cancleRequest, isPending: ispending2 } = useMutation({
    mutationKey: ["cancleleave"],
    mutationFn: ({ user, leaveId, cancleReason }) =>
      cancleleaveApi(user, leaveId, cancleReason),
    onSuccess: () => {
      toast.success("Cancel Leave Request Successfully");
      query.invalidateQueries(["leaveHistory"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return {
    cancleRequest,
    ispending2,
  };
};

export default useCancleLeaveRequest;
