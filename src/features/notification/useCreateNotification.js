import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNotification as createNotificationApi } from "../../services/Notification"
const useCreateNotification = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (values) => createNotificationApi(values),
        mutationKey: ["notification"],
        onSuccess: () => {
            toast.success("Notification Sent!!");
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.error)
        }
    })

    return {
        mutate,
        isPending
    }
}

export default useCreateNotification;