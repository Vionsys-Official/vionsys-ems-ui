import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance as createAttendanceApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";
import getUserIdRole from "../../utils/getUserIdRole"; // Import this to get the user ID

const useCreateAttendance = () => {
  const queryClient = useQueryClient();
  const { id } = getUserIdRole(); // Get the user ID

  const { mutate: createAttendance, isPending } = useMutation({
    mutationFn: ({ user, time, timeTag, shift, note }) =>
      createAttendanceApi({ user, time, timeTag, shift, note }),
    mutationKey: ["attendance"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("You are checked in. Let's work!");

      // Invalidate the attendance query for this specific user to update the calendar
      queryClient.invalidateQueries({
        queryKey: ["attendances", id],
      });
    },
  });
  return { createAttendance, isPending };
};

export default useCreateAttendance;
