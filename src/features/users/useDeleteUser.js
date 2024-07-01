import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../services/usersApi";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient =  useQueryClient();
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    mutationKey: ["users"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User deleted successfully !")
    },
  });

  return {
    deleteUser,
    isPending,
  };
};
