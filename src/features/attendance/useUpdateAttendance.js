import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendanceApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";
import getUserIdRole from "../../utils/getUserIdRole";

const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  const { id } = getUserIdRole(); // Get the user ID

  const { mutate: updateAttendance, isPending } = useMutation({
    mutationFn: ({ user, time, shift, timeTag }) =>
      updateAttendanceApi({ user, time, shift, timeTag }),
    mutationKey: ["attendance"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: () => {
      toast.success("You have checked out successfully!");

      // Invalidate the attendance query for this specific user to update the calendar
      queryClient.invalidateQueries({
        queryKey: ["attendances", id],
      });
    },
  });
  return { updateAttendance, isPending };
};

export default useUpdateAttendance;
