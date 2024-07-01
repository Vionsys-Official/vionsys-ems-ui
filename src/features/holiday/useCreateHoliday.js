import { createHoliday as createHolidayApi } from "../../services/holiday";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateHoliday = () => {
  const query = useQueryClient();
  const { mutate: createHoliday, isPending: CreatePending } = useMutation({
    mutationFn: (data) => createHolidayApi(data),
    onSuccess: () => {
      query.invalidateQueries(["getholiday"]);
      toast.success("Holiday added to calendar");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });
  return { createHoliday, CreatePending };
};
export default useCreateHoliday;
