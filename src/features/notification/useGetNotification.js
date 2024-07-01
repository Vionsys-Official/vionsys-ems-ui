import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../../services/Notification"

const useGetNotification=()=>{
    
   const {isPending,data}= useQuery({
        queryKey:["notifications"],
        queryFn:getNotifications,
    })

    return{
        isPending,
        data
    }
}

export default useGetNotification;