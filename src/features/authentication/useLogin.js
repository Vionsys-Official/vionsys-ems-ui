import { useMutation } from "@tanstack/react-query"
import { login as loginApi } from "../../services/authApi"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const { data, mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    mutationKey: ["users"],
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/home", { replace: true });
      window.location.reload();
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    }
  })

  return {
    data,
    login,
    isPending,
  }
}

export default useLogin