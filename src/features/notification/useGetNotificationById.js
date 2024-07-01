import { useQuery } from "@tanstack/react-query"
import { getNotification } from "../../services/Notification"

const useGetNotificationById=(id)=>{
    
   const {data,isLoading}= useQuery({
        queryKey:["notifications",id],
        queryFn:()=>getNotification(id),
    })

    return {
        data,
        isLoading
    }
}

export default useGetNotificationById;