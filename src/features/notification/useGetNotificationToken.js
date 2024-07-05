// useGetNotificationToken.js
import { useMutation } from "@tanstack/react-query";
import { getNotificationToken } from "../../services/Notification";
import toast from "react-hot-toast";

const useGetNotificationToken = () => {
  const { mutate: sendNotificationToken, error } = useMutation({
    mutationFn: (notificationToken) => getNotificationToken(notificationToken),
    mutationKey: ["getToken"],
    onSuccess: () => toast.success("Notification permission granted"),
    onError: () =>
      toast("Please re-enable notification permissions.", {
        icon: "⚠️",
      }),
  });

  return {
    sendNotificationToken,
    error,
  };
};

export default useGetNotificationToken;
