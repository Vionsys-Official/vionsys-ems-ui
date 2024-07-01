import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask as createTaskApi } from "../../services/taskAPI"
import toast from "react-hot-toast"


const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate: createTask, isPending } = useMutation({
        mutationFn: (values) => createTaskApi(values),
        onSuccess: () => {
            toast.success('Task assigned successfully!!!');
            queryClient.invalidateQueries(["getTasksFromUserId"]);
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response.data.error);
        }
    });

    return {
        createTask,
        isPending
    }
};

export default useCreateTask;