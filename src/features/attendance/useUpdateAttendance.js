import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendanceApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";

const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  
  const { mutate: updateAttendance, isPending } = useMutation({
    mutationFn: ({time,timeTag, user}) => updateAttendanceApi({time,timeTag,user}),
    mutationKey: ["attendance"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    }
  });
  return { updateAttendance, isPending };
};

export default useUpdateAttendance;
