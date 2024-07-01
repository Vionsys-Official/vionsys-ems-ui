
import { useQuery } from "@tanstack/react-query";
import { getAllTasks as getAllTasksApi } from "../../services/taskAPI";
const useGetAllTasks = () => {
    const { data, isPending } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getAllTasksApi(),
    });

    return {
        data,
        isPending
    }
};

export default useGetAllTasks;