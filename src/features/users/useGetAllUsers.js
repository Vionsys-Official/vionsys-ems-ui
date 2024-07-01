import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../services/usersApi";


const useGetAllUsers = (userId) => {

  const { data: allUsers, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUserApi(userId),
  });

  return {allUsers, isPending}
};

export default useGetAllUsers;
