import toast from "react-hot-toast";
import { ResetPassword as ResetPasswordApi } from "../../services/authApi";
import { useMutation } from "@tanstack/react-query";

const useResetPassword = () => {
  const {
    data,
    mutate: resetpasword,
    isPending,
  } = useMutation({
    mutationFn: ({ password, passwordConfirm ,token}) =>
      ResetPasswordApi(password, passwordConfirm,token ),
    onSuccess: (res) => toast.success(res.data.message),
    onError: (err) => toast.error(err.response.data.error),
  });
  return {
    resetpasword,
    data,
    isPending,
  };
};

export default useResetPassword;
