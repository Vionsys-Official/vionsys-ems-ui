import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResignation as createResignationApi } from "../../services/resignationApi";
import toast from "react-hot-toast";

const useCreateResignation = () => {
  const queryClient = useQueryClient();

  const { mutate: createResignation, isLoading } = useMutation({
    mutationFn: (data) => createResignationApi(data),
    onSuccess: (res) => {
      toast.success(res.message || "Resignation submitted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getResignationById"],
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to submit resignation.");
    },
  });

  return {
    createResignation,
    isLoading,
  };
};

export default useCreateResignation;
