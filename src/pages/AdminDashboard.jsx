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
      icon: <GoPeople size={30} className="text-cyan-700" />
    }
    , {
      id: 2,
      title: "Available Employees",
      value: `${available}`,
      icon: <FiUserCheck size={30} className="text-green-600" />
    }, {
      id: 3,
      title: "Unavailable Employees",
      value: `${unAvailable}`,
      icon: <BsPersonX size={30} className="text-red-500" />
    }
  ]
  return (
    <div className="bg-white dark:bg-[#475569]">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 shadow-2xl  grid-cols-1 gap-x-8 px-8 py-4">
        {
          emps_data.map((item) => (
            <div key={item.id} className="flex shadow-md flex-wrap  p-4 rounded-3xl  bg-white justify-between items-center " style={{ backgroundImage: `url('/assets/cardBg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="bg-slate-100 rounded-full p-4">{item.icon}</div>
              <div className="flex flex-col space-y-4 text-center">
                <h3 className="text-md">{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className="p-8 grid md:grid-cols-3 gap-2 relative overflow-x-hidden">
        <UserAvailable />
        <Card className="dark:bg-gray-700 shadow-2xl dark:shadow-zinc-500 mx-3 border-none">
          <h1 className="text-xl font-semibold border-b-2 dark:text-white rounded-full py-2 border-orange-500 text-center">Employees By Gender</h1>
          <div className="top-0 relative flex justify-center items-center">
            <ResponsiveContainer minHeight={320} >
              <PieChart>
                <Pie
                  data={chartData}
                  cx={140}
                  cy={150}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  paddingAngle={1}
                  dataKey="value"  
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
    </div>
  );
};

export default AdminDashboard;
