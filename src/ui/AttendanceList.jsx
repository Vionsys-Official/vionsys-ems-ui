import { LoaderIcon } from "react-hot-toast";
import { Button, Modal, Popover, Table, Tag } from "antd";
import UserAttendance from "../ui/user/UserAttendance";
import useGetAllAttendance from "../features/attendance/useGetAllAttendance";
import withAuth from "../store/withAuth";
import { format, parseISO, differenceInHours } from "date-fns";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import { RiFileExcel2Line } from "react-icons/ri";
import ExcelForm from "./ExcelForm";
import { useState } from "react";
import "../utils/css/attendance.css";
import { IoCalendarOutline } from "react-icons/io5";
import getDeviceNameFromUserAgent from "../utils/getDeviceNameFromUserAgent";

const dateFormatNormal = (date) => {
  return format(parseISO(date), "dd/MM/yyyy");
};

const dateToTime = (dateStr) => {
  return format(parseISO(dateStr), "h:mm:ss a");
};

const AttendanceList = () => {
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isPending } = useGetAllAttendance();
  // console.log(data?.data?.attendance)
  const [isCalendarShow, setIsCalendarShow] = useState(false);

  const handleCalendarClick = (user) => {
    // console.log(user)
    setSelectedUser(user);
    setIsCalendarShow(true);
  };

  const handleCancel = () => {
    setIsCalendarShow(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      key: "employeeId",
      dataIndex: "employeeId",
      title: "EMP ID",
      width: 100,
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "EMP Name",
      fixed: "left",
      width: 150,
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      width: 100,
    },
    {
      key: "loginDetails",
      title: "Login Details",
      width: 180,
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-2">
            <p className="flex gap-2">
              <p>Time:{""}</p>
              <Tag color="blue">{record.loginTime}</Tag>
            </p>
            <p className="flex gap-2">
              <p>Device:{""}</p>
              <Tag color="green">
                {getDeviceNameFromUserAgent(record.loginDevice)}
              </Tag>
            </p>
          </div>
        );
      },
    },
    {
      key: "logoutDetails",
      title: "Logout Details",
      width: 180,
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-2">
            <p className="flex gap-2">
              <p>Time:{""}</p>
              <Tag color="blue">{record.logoutTime}</Tag>
            </p>
            <p className="flex gap-2">
              <p>Device:{""}</p>
              <Tag color="green">
                {getDeviceNameFromUserAgent(record.logoutDevice)}
              </Tag>
            </p>
          </div>
        );
      },
    },
    ,
    {
      key: "workTime",
      dataIndex: "workTime",
      title: "Work Time",
      width: 100,
      render: (text, record) => {
        // Calculate work time in hours
        const loginTime =
          record.loginTime !== "-" ? parseISO(record.loginTime) : null;
        const logoutTime =
          record.logoutTime !== "-" ? parseISO(record.logoutTime) : null;

        if (loginTime && logoutTime) {
          const workHours = differenceInHours(logoutTime, loginTime);
          const color = workHours >= 8 ? "green" : "";
          return <span style={{ color }}>{text}</span>;
        }

        return text;
      },
    },
    {
      key: "Monthly Calendar",
      dataIndex: "monthlyCalendar",
      title: "Monthly Calendar",
      width: 100,
      render: (_, record) => (
        <Button
          icon={<IoCalendarOutline className="w-6 h-6" />}
          onClick={() => handleCalendarClick(record)}
        />
      ),
    },
  ];

  const dataSource = data?.data?.attendance?.map((item) => {
    const uid = item?._id;
    const ID = item?.attendances[0]?._id;
    const loginTime = item?.attendances[0]?.loginTime
      ? dateToTime(item?.attendances[0]?.loginTime)
      : "-";
    const loginDevice = item?.attendances[0]?.loginDevice || "-";
    const logoutTime = item?.attendances[0]?.logoutTime
      ? dateToTime(item?.attendances[0]?.logoutTime)
      : "-";
    const logoutDevice = item?.attendances[0]?.logoutDevice || "-";
    const workTime =
      loginTime !== "-" && logoutTime !== "-"
        ? getDateDifferenceWithFormat(
            item?.attendances[0]?.logoutTime,
            item?.attendances[0]?.loginTime
          )
        : "-";
    // console.log(data?.data?.attendance);
    return {
      uid: item._id,
      name: `${item?.user?.firstName} ${item?.user?.lastName}`,
      date: dateFormatNormal(item?.attendances[0]?.date),
      employeeId: item?.user?.employeeId,
      loginTime,
      loginDevice,
      logoutTime,
      logoutDevice,
      ID,
      workTime,
      monthlyCalendar: "Calendar",
    };
  });
  // console.log(dataSource)
  return (
    <section className="py-5">
      <div className="attendance-list-container dark:bg-gray-800 ">
        <div className="flex-row gap-4 mb-5 rounded-lg dark:border-gray-800">
          <ExcelForm isModalOpen={modal} setIsModalOpen={setModal} />
          <div className="attendance-list-header flex gap-4 mb-5 border-2 rounded-lg border-blue-200 dark:border-gray-600">
            <h2 className="attendance-list-title">Attendance List</h2>
            <Popover
              placement="topLeft"
              title="Get Excel"
              style={{ width: "100px" }}
            >
              <Button
                className="attendance-list-excel-button bg-green-500 text-white"
                onClick={() => setModal(true)}
              >
                <RiFileExcel2Line />
              </Button>
            </Popover>
          </div>
          <div className="border-2 rounded-lg border-blue-200 dark:border-gray-600">
            {isPending && <LoaderIcon />}
            <Table
              className="attendance-list-table "
              scroll={{ x: 800 }}
              columns={columns}
              dataSource={dataSource}
              rowClassName="attendance-list-row"
            />
          </div>
        </div>
      </div>

      {/* Modal to show User Attendance */}
      <Modal
        title="User Attendance"
        open={isCalendarShow}
        onCancel={handleCancel}
        footer={null}
        width={1200}
      >
        {selectedUser && <UserAttendance user={selectedUser} />}
      </Modal>
    </section>
  );
};

export default withAuth(AttendanceList, ["admin"]);
