import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance as createAttendanceApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";

const useCreateAttendance = () => {
  const queryClient = useQueryClient();
  const { mutate: createAttendance, isPending } = useMutation({
    mutationFn: ({ user, time, timeTag, note }) =>
      createAttendanceApi({ user, time, timeTag, note }),
    mutationKey: ["attendance"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("You are checked in. Let's work ! ");

      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },
  });
  return { createAttendance, isPending };
};

export default useCreateAttendance;
