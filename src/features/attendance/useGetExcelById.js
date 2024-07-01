import { useMutation } from "@tanstack/react-query";
import { getExcelDataByID as getExcelDataBYIdApi } from "../../services/attendanceApi";
import toast from "react-hot-toast";

const useGetExcelById = () => {
  const {
    data,
    mutate: getExcelByid,
    isPending: isPending2,
  } = useMutation({
    mutationKey: "getexceldataById",
    mutationFn: ({ Format_startDate, Format_endDate, email, userId }) =>
      getExcelDataBYIdApi(Format_startDate, Format_endDate, email, userId),
    onError: (error) => {
      toast.error(error.response.data.error);
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
  });

  return {
    data,
    getExcelByid,
    isPending2,
  };
};

export default useGetExcelById;
