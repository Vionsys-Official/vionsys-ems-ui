import { useQuery } from "@tanstack/react-query";
import { getAllAttendance } from "../../services/attendanceApi";
import getUserIdRole from "../../utils/getUserIdRole";

const useGetAllAttendance = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useQuery({
    queryFn: getAllAttendance,
    queryKey: ["attendance", id],
  });
  return { data, isPending };
};

export default useGetAllAttendance;
