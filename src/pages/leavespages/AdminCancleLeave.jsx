import React, { useState } from "react";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetLeaveRequests from "../../features/leaves/useGetLeaveRequests";
import { format } from "date-fns";
import { Input, Tag } from "antd";
import { LoaderIcon } from "react-hot-toast";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";
import "../../utils/css/AdminLeavePage.css";
import { SearchOutlined } from "@ant-design/icons";
import withAuth from "../../store/withAuth";

const AdminCancleLeave = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetLeaveRequests(id);
  const [searchName, setSearchName] = useState("");

  const dataSource = [];
  const AllLeaves = data?.AllLeaves;
  AllLeaves?.forEach((leave) => {
    leave?.leaves?.forEach((leaveData) => {
      const fullName = `${leave?.firstName} ${leave?.lastName}`;
      if (
        fullName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
      ) {
        dataSource.push({
          key: leaveData?._id,
          email: leave?.email,
          name: fullName,
          ...leaveData,
        });
      }
    });
  });

  const CancledLeaves = dataSource?.filter(
    (leave) => leave?.leaveStatus == "Cancelled"
  );
  console.log(CancledLeaves);

  const sorteduserLeaves = CancledLeaves?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Leave Reason",
      dataIndex: "leaveReason",
      key: "leaveReason",
      render: (leaveReason) => (leaveReason ? leaveReason : "NA"),
    },
    {
      title: "Cancel Reason",
      dataIndex: "cancleReason",
      key: "cancleReason",
      render: (cancleReason) => (cancleReason ? cancleReason : "NA"),
    },
    {
      title: "Leave Mode",
      dataIndex: "halfDay",
      key: "halfDay",
      render: (halfDay) => (halfDay ? "Half Day" : "Full Day"),
    },
    {
      title: "Leave Days",
      dataIndex: "leaveDays",
      key: "leaveDays",
    },

    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Cancelled Date",
      dataIndex: "cancleDate",
      key: "cancleDate",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave Start",
      dataIndex: "leaveStart",
      key: "leaveStart",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave End",
      dataIndex: "leaveEnd",
      key: "leaveEnd",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Leave Status",
      dataIndex: "leaveStatus",
      key: "leaveStatus",
      render: (leaveStatus) => {
        let color = "black";
        return (
          <Tag color={color} key={leaveStatus}>
            {leaveStatus}
          </Tag>
        );
      },
    },
  ];

  return (
    <section className="py-5">
      <div className="gap-4 mb-5 admin-leave-page-container">
        <Input
          className="p-2 border-2 rounded-lg border-blue-200"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          prefix={<SearchOutlined />}
          style={{
            marginBottom: "16px",
            width: "300px",
          }}
        />
        <div className="admin-leave-table border-2 rounded-lg border-blue-200">
          {isPending && <LoaderIcon />}
          {data && (
            <UserLeaveHistory userleave={sorteduserLeaves} columns={columns} />
          )}
        </div>
      </div>
    </section>
  );
};

export default withAuth(AdminCancleLeave, ["admin"]);
