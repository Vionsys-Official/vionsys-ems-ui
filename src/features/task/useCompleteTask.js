import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCompletedTask as updateCompletedTaskAPI } from "../../services/taskAPI";
import toast from "react-hot-toast";
const useCompleteTask = () => {
    const queryClient = useQueryClient();
    const { mutate: completeTask, isPending: isCompleted } = useMutation({
        mutationFn: (id) => updateCompletedTaskAPI(id),
        onSuccess: () => {
            toast.success("Task work completed!!");
            queryClient.invalidateQueries(["getTasksFromUserId"]);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong!! Please try again later  !!");
        }
    });
    return { completeTask, isCompleted };

};

export default useCompleteTask;