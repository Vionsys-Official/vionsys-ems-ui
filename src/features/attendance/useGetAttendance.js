import { useQuery } from "@tanstack/react-query";
import getUserIdRole from "../../utils/getUserIdRole";
import { getAttendance } from "../../services/attendanceApi";

const useGetAttendance = ({ uid = null } = {}) => {
  const { id } = getUserIdRole();
  const sid = uid ?? id; // Use uid if provided, otherwise use id

  const { data, isPending } = useQuery({
    queryFn: () => getAttendance(sid),
    queryKey: ["attendance", sid],
  });

  return { data, isPending };
};

export default useGetAttendance;
