import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeaveCount as updateLeaveCountApi } from "../../services/leavesApi";
import toast from "react-hot-toast";

const useUpdateLeaveCount = () => {
  const queryClient = useQueryClient();

  const { mutate: updateLeaveCount, isPending } = useMutation({
    mutationFn: ({ userId, leaveData }) => updateLeaveCountApi(userId, leaveData),
    mutationKey: "updateLeaveCount",
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["userLeaveHistory"], // Adjust if needed to invalidate relevant queries
      });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Error updating leave count");
    },
  });

  return {
    updateLeaveCount,
    isPending,
  };
};

export default useUpdateLeaveCount;
