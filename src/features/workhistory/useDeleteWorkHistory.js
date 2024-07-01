import { deleteWorkHistory as deleteWorkHistoryApi } from "../../services/workhistoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const useDeleteWorkHistory = () => {
  const query = useQueryClient();
  const { mutate: deletework, isPending: deletePending } = useMutation({
    mutationFn: (id) => deleteWorkHistoryApi(id),
    onSuccess: (res) => {
      query.invalidateQueries(["getworkhistory"]);
      toast.success(res.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { deletework, deletePending };
};

export default useDeleteWorkHistory;
