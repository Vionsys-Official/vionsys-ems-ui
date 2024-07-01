import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeaveRequest as createLeaveRequestApi } from "../../services/leavesApi";
import toast from "react-hot-toast";

const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();
  const { mutate: createRequest, isPending } = useMutation({
    mutationFn: (data) => createLeaveRequestApi(data),
    mutationKey: "createrequest",
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["userLeaveHistory"],
      });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return {
    createRequest,
    isPending,
  };
};

export default useCreateLeaveRequest;
