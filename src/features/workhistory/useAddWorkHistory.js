import toast from "react-hot-toast";
import { addWorkHistory as addWorkHistoryApi } from "../../services/workhistoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddWorkHistory = () => {
  const query = useQueryClient();
  const { mutate: addwork, isPending: CreatePending } = useMutation({
    mutationFn: (data) => addWorkHistoryApi(data),
    onSuccess: (res) => {
      query.invalidateQueries(["getworkhistory"]);
      toast.success(res?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { addwork, CreatePending };
};

export default useAddWorkHistory;
