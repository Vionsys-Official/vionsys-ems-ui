import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { updateResignationStatus as updateResignationStatusApi } from "../../services/resignationApi";
import getUserIdRole from "../../utils/getUserIdRole";

const useUpdateResignationAdmin = () => {
  const queryClient = useQueryClient();
  const { id: userId } = getUserIdRole();
  const { mutate: dataupdateResignation, isLoading: isPending } = useMutation({
    mutationFn: ({ resignationId, userId, status, note }) =>
      updateResignationStatusApi({ resignationId, userId, status, note }),
    onSuccess: () => {
      message.success("Resignation status updated successfully");
      queryClient.invalidateQueries(["getAllResignations"]);
      queryClient.invalidateQueries(["getResignationById", userId]);
    },
    onError: (err) => {
      console.log(err);
      message.error(err.message || "Failed to update resignation status");
    },
  });

  return {
    dataupdateResignation,
    isPending,
  };
};

export default useUpdateResignationAdmin;
