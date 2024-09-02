import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../services/usersApi";


const useGetAllUsers = () => {

  const { data: allUsers, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUserApi(),
  });

  return {allUsers, isPending}
};

export default useGetAllUsers;
