import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/authApi";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (values) => signupApi(values),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });
  return {
    signup,
    isPending,
  };
};

export default useSignup;
