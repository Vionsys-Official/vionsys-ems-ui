import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateAttendance as adminUpdateAttendanceApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";

const useUpdateAttendanceAdmin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateAttendanceAdmin, isPending } = useMutation({
    mutationFn: ({ userId, date, loginTime, logoutTime }) =>
      adminUpdateAttendanceApi({ userId, date, loginTime, logoutTime }),
    mutationKey: ["attendance"],
    onSuccess: () => {
      // Invalidate attendance queries to refresh the data
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Attendance updated successfully");
    },
    onError: (error) => {
      // Handle errors gracefully
      const errorMessage = error?.response?.data?.error || "Failed to update attendance.";
      toast.error(errorMessage);
    },
  });

  return { updateAttendanceAdmin, isPending };
};

export default useUpdateAttendanceAdmin;
