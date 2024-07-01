import { Card } from "antd";
import UserAvailable from "../ui/UserAvailable";
import Notifications from "../ui/Notifications";
import { GoPeople } from "react-icons/go";
import { FiUserCheck } from "react-icons/fi";
import { BsPersonX } from "react-icons/bs";
import useGetAllUsers from "../features/users/useGetAllUsers";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useGetAllAttendance from "../features/attendance/useGetAllAttendance";
import { isToday } from "date-fns";
import HighlightsBDWA from "../ui/user/HighlightsBDWA";

const AdminDashboard = () => {
  const { data, isPending } = useGetAllAttendance();
  const employeeAttendances = data?.data?.attendance.map((item) => {
    return {
      name: `${item.user.firstName}`,
      date: !!item?.attendances.filter((item) => isToday(new Date(item.date)))
        .length,
    };
  });
  const available = employeeAttendances?.filter((item) => item.date)?.length;
  const { allUsers } = useGetAllUsers();
  const availableEmployees = allUsers?.data?.users?.map((item) => {
    return {
      gender: item?.gender,
    }
  });
  const unAvailable = parseInt(availableEmployees?.length) - available;

  const male = availableEmployees?.filter(item => item.gender === "Male")?.length;
  const female = availableEmployees?.filter(item => item.gender === "Female")?.length;
  const chartData = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  const emps_data = [
    {
      id: 1,
      title: "Total Employees",
      value: `${availableEmployees?.length}`,
      icon: <GoPeople size={30} className="text-cyan-400" />
    }
    , {
      id: 2,
      title: "Available Employees",
      value: `${available}`,
      icon: <FiUserCheck size={30} className="text-green-400" />
    }, {
      id: 3,
      title: "Unavailable Employees",
      value: `${unAvailable}`,
      icon: <BsPersonX size={30} className="text-red-300" />
    }
  ]
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 px-8 pt-8">
        {
          emps_data.map((item) => (
            <div key={item.id} className="flex flex-wrap gap-2 p-4 bg-white justify-evenly items-center rounded-md">
              <div className="bg-slate-100 rounded-full p-4">{item.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-md">{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="p-8 grid md:grid-cols-3 gap-2 relative overflow-x-hidden">
        <UserAvailable />
        <Card>
          <h1 className="text-xl">Employees By Gender</h1>
          <div className="top-0 relative flex justify-center items-center">
            <ResponsiveContainer minHeight={320} >
              <PieChart>
                <Pie
                  data={chartData}
                  cx={130}
                  cy={130}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  layout="horizontal"
                />
              </PieChart>

            </ResponsiveContainer>
          </div>
        </Card>
        <HighlightsBDWA />
        <Notifications />

      </div>
    </>
  );
};

export default AdminDashboard;
