import toast from "react-hot-toast";
import { ForgotPassword as forgotPasswordApi } from "../../services/authApi";
import { useMutation } from "@tanstack/react-query";

const useForgotPassword = () => {
  const {
    data,
    mutate: sendForgotMail,
    isPending,
  } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onSuccess: (res) => toast.success(res.data.message),
    onError: (err) => toast.error(err.response.data.error),
  });
  return {
    sendForgotMail,
    data,
    isPending,
  };
};

export default useForgotPassword;
