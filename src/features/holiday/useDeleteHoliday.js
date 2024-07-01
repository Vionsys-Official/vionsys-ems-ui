import { deleteHoliday as deleteHolidayApi } from "../../services/holiday";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteHoliday = () => {
  const query = useQueryClient();
  const { mutate: deleteHoliday, isPending: deletePending } = useMutation({
    mutationFn: (id) => deleteHolidayApi(id),
    onSuccess: () => {
      query.invalidateQueries(["getholiday"]);
      toast.success("Holiday Deleted !!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { deleteHoliday, deletePending };
};
export default useDeleteHoliday;
