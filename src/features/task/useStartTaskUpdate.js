import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateStartTask as updateStartTaskAPI } from "../../services/taskAPI"


const useStartTaskUpdate = () => {
    const queryClient = useQueryClient();
    const { mutate: startTask, isPending: isSubmitting } = useMutation({
        mutationFn: (id) => updateStartTaskAPI(id),
        onSuccess: () => {
            toast.success("Task work started!!");
            queryClient.invalidateQueries(["getTasksFromUserId"]);
        },
        onError: (error) => {
            toast.error("Something went wrong!! Please try again later  !!");
        }
    });
    return {
        startTask,
        isSubmitting
    }
};

export default useStartTaskUpdate;