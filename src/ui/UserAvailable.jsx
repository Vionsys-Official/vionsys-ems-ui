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
    { name: "Unavailable", value: unAvailable},
  ];
  const COLORS = ["#87d068","#ff3333", "#FFBB28", "#FF8042"];

  return (
    <Card className="relative">
      <h1 className="text-xl pb-2">Available</h1>
      {isPending ? (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <LoaderIcon />
        </div>
      ) : (
        <div className="">
          <div className="py-2">
            <Avatar.Group>
              {availableEmployees.map((item) => {
                return (
                  <AntToolTip key={item.name} title={item.name} placement="top">
                    <Avatar
                      style={{
                        backgroundColor: `${
                          item.date ? "#87d068" : "#ff3333"
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
                  cx={100}
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
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
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
