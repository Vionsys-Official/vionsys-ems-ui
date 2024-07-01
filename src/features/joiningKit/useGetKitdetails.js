import { useQuery } from "@tanstack/react-query";
import { getKitDetails as getKitDetailsApi } from "../../services/joiningKitApi";

const useGetKitdetails = (userId) => {
  const { data, isPending } = useQuery({
    queryFn: () => getKitDetailsApi(userId),
    queryKey: ["getKitDetails", userId],
  });
  return { data, isPending };
};
export default useGetKitdetails;
