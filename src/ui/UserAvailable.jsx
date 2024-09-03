import { Avatar, Card, Tooltip as AntToolTip } from "antd";
import { LoaderIcon } from "react-hot-toast";
import useGetAllAttendance from "../features/attendance/useGetAllAttendance";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { isToday } from "date-fns";

const UserAvailable = () => {
  const { data, isPending } = useGetAllAttendance();
  const availableEmployees = data?.data?.attendance.map((item) => {
    return {
      name: `${item.user.firstName}`,
      date: !!item?.attendances.filter((item) => isToday(new Date(item.date)))
        .length,
    };
  });
  const available = availableEmployees?.filter((item) => item.date)?.length;
  const unAvailable = availableEmployees?.filter((item) => !item.date)?.length;

  const chartData = [
    { name: "Available", value: available },
    { name: "Unavailable", value: unAvailable },
  ];
  const COLORS = ["#00C49F", "#ff3333", "#00C49F", "#00C49F"];

  return (
    <Card className="relative dark:bg-gray-700 shadow-2xl dark:shadow-zinc-500  border-none">
      <h1 className="text-xl font-semibold border-b-2 dark:text-white rounded-full py-2 border-orange-500 text-center">Available</h1>
      {isPending ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <LoaderIcon />
        </div>
      ) : (
        <div className=" pt-6">
          <div className="py-2 pb-2 text-center">
            <Avatar.Group
              maxCount={10}
              className="flex flex-wrap gap-y-2">
              {availableEmployees.map((item) => {
                return (
                  <AntToolTip key={item.name} title={item.name} placement="top" >
                    <Avatar
                      className="hover:scale-125  transition-transform duration-200 ease-in-out"
                      style={{
                        backgroundColor: `${item.date ? "#00C49F" : "#ff3333"
                          }  `,
                      }}
                      alt={item.name}
                    >
                      {item.name}
                    </Avatar>
                  </AntToolTip>
                );
              })}
            </Avatar.Group>
          </div>
          <div className="">
            <ResponsiveContainer minHeight={240} minWidth={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx={150}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  layout="horizontal"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserAvailable;
