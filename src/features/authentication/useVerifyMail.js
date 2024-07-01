import { useMutation } from "@tanstack/react-query";
import { sendverifymail as sendverifymailApi } from "../../services/authApi";
import toast from "react-hot-toast";

const sendverifymail = () => {
  const { mutate: sendmail, isPending } = useMutation({
    mutationFn: (token) => sendverifymailApi(token),
    mutationKey: ["verifymail"],
    onSuccess: (res) => toast.success(res?.data?.message),
    onError: (err) => toast.error(err?.response?.data?.error),
  });

  return { sendmail, isPending };
};
export default sendverifymail;
