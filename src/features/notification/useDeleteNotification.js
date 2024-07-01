import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNotification as deleteNotificationApi } from "../../services/Notification"
const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const { mutate:deletes, isPending } = useMutation({
        mutationFn: (id)=>deleteNotificationApi(id),
        mutationKey: ["notificationDelete"],
        onSuccess: () => {
            toast.success("Notification Deleted!!");
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
        onError: (err) => {
            toast.error(err.response.data.error)
        }
    })

    return {
        deletes,
    }
}

export default useDeleteNotification;