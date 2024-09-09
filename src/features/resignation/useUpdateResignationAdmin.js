import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { updateResignationStatus as updateResignationStatusApi } from "../../services/resignationApi";

const useUpdateResignationAdmin = () => {
  const queryClient = useQueryClient();
  const { mutate: dataupdateResignation, isLoading: isPending } = useMutation({
    mutationFn: ({ resignationId, userId, status, note , adminId}) =>
      updateResignationStatusApi({ resignationId, userId, status, note , adminId}),
    onSuccess: () => {
      message.success("Resignation status updated successfully");
      queryClient.invalidateQueries(["getAllResignations"]);
    },
    onError: (err) => {
     
      message.error(err.message || "Failed to update resignation status");
    },
  });

  return {
    dataupdateResignation,
    isPending,
  };
};

export default useUpdateResignationAdmin;
