import { useQuery } from "@tanstack/react-query";
import { getHoliday as getHolidayApi } from "../../services/holiday";

const getholidayList = (year) => {
  const { data, isPending } = useQuery({
    queryFn: () => getHolidayApi(year),
    queryKey: ["getholiday", year],
  });
  return { data, isPending };
};
export default getholidayList;
