import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getleavehistory } from "../../services/leavesApi";

const useGetLeaveRequests = (id) => {
  const { data, isPending, isError } = useQuery({
    queryFn: () => getleavehistory(id),
    queryKey: ["leaveHistory"],
  });
  return { isPending, data, isError };
};

export default useGetLeaveRequests;
