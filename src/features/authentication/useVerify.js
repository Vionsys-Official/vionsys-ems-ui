import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyMail as verifyMailApi } from "../../services/authApi";
import toast from "react-hot-toast";

const verificationOfMail = () => {
  const queryClient = useQueryClient();
  const {
    mutate: verify,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: "verifymail",
    mutationFn: (token) => verifyMailApi(token),
    onSuccess: () => {
      toast.success("mail is verified succesfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err?.response?.data?.error),
  });

  return { verify, isPending, isError, isSuccess };
};

export default verificationOfMail;
