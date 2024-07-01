import { useQuery } from "@tanstack/react-query";
import { getTasksFromUserId as getTasksFromUserAPI } from "../../services/taskAPI";

const useGetTasksFromUserId=()=>{
     const {data,isPending} =useQuery({
        queryKey: ["getTasksFromUserId"],
        queryFn:getTasksFromUserAPI,
      });

      return {
        data,
        isPending
      }
};

export default useGetTasksFromUserId;