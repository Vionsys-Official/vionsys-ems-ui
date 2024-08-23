import { LoaderIcon } from "react-hot-toast";
import { Button, Popover, Table } from "antd";
import useGetAllAttendance from "../features/attendance/useGetAllAttendance";
import withAuth from "../store/withAuth";
import { format, parseISO, differenceInHours } from "date-fns";
import getDateDifferenceWithFormat from "../utils/getDateDifferenceWithFormat";
import { RiFileExcel2Line } from "react-icons/ri";
import ExcelForm from "./ExcelForm";
import { useState } from "react";
import "../utils/css/attendance.css";

const dateFormatNormal = (date) => {
  return format(parseISO(date), "dd/MM/yyyy");
};

const dateToTime = (dateStr) => {
  return format(parseISO(dateStr), "h:mm:ss a");
};

const AttendanceList = () => {
  const [modal, setModal] = useState(false);
  const { data, isPending } = useGetAllAttendance();

  const columns = [
    {
      key: "employeeId",
      dataIndex: "employeeId",
      title: "EMP ID",
      width: 80,
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "EMP Name",
      fixed: "left",
      width: 120,
      render: (text) => <span className="font-semibold">{text}</span>
    },
    {
      key: "date",
      dataIndex: "date",
      title: "Date",
      width: 100,
    },
    {
      key: "loginTime",
      dataIndex: "loginTime",
      title: "Login Time",
      width: 120,
    },
    {
      key: "logoutTime",
      dataIndex: "logoutTime",
      title: "Logout Time",
      width: 120,
    },
    {
      key: "workTime",
      dataIndex: "workTime",
      title: "Work Time",
      width: 120,
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
  ];

  const dataSource = data?.data?.attendance?.map((item) => {
    const loginTime = item?.attendances[0]?.loginTime
      ? dateToTime(item?.attendances[0]?.loginTime)
      : "-";
    const logoutTime = item?.attendances[0]?.logoutTime
      ? dateToTime(item?.attendances[0]?.logoutTime)
      : "-";
    const workTime =
      loginTime !== "-" && logoutTime !== "-"
        ? getDateDifferenceWithFormat(
            item?.attendances[0]?.logoutTime,
            item?.attendances[0]?.loginTime
          )
        : "-";
    return {
      name: `${item?.user?.firstName} ${item?.user?.lastName}`,
      date: dateFormatNormal(item?.attendances[0]?.date),
      employeeId: item?.user?.employeeId,
      loginTime,
      logoutTime,
      workTime,
    };
  });

  return (
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
  );
};

export default withAuth(AttendanceList, ["admin"]);
