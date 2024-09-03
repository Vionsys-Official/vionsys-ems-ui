import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelResignation as cancleResignationApi } from "../../services/resignationApi";

const useCancleResignation = () => {
  const queryClient = useQueryClient();

  const { mutate: cancleResignation, isLoading: isCanclePending } = useMutation(
    {
      mutationKey: ["cancleResignation"],
      mutationFn: ({ resignationId, reason }) =>
        cancleResignationApi({ resignationId, reason }),
      onSuccess: () => {
        toast.success("Resignation canceled successfully");
        queryClient.invalidateQueries(["getAllResignations"]); // Adjust based on your query key
      },
      onError: (err) => {
        toast.error(err.message || "Failed to cancel resignation");
      },
    }
  );

  return {
    cancleResignation,
    isCanclePending,
  };
};

export default useCancleResignation;
