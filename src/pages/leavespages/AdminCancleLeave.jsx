import React, { useState } from "react";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetLeaveRequests from "../../features/leaves/useGetLeaveRequests";
import { format } from "date-fns";
import { Input, Tag } from "antd";
import { LoaderIcon } from "react-hot-toast";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";

const AdminCancleLeave = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetLeaveRequests(id);
  const [searchName, setSearchName] = useState("");

  const dataSource = [];
  const AllLeaves = data?.AllLeaves;
  AllLeaves?.forEach((leave) => {
    leave?.leaves?.forEach((leaveData) => {
      const fullName = `${leave?.firstName} ${leave?.lastName}`;
      if (fullName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())) {
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
      title: "Request date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : "NA"),
    },
    {
      title: "Cancelled date",
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
        let color = "red";
        return (
          <Tag color={color} key={leaveStatus}>
            {leaveStatus}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="px-5">
      <Input
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      {isPending && <LoaderIcon />}
      {data && (
        <UserLeaveHistory userleave={sorteduserLeaves} columns={columns} />
      )}
    </div>
  );
};

export default AdminCancleLeave;
