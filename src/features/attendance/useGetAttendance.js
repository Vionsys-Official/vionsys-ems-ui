import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../services/attendanceApi";
import getUserIdRole from "../../utils/getUserIdRole";

const useGetAttendance = () => {
const {id} = getUserIdRole()
  const { data, isPending } = useQuery({
    queryFn: () => getAttendance(id),
    queryKey: ["attendance", id],
  });
  
  return { data, isPending };
};

export default useGetAttendance;
