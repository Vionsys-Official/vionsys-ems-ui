import React from "react";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetUserLeaveHistory from "../../features/leaves/useGetUserLeaveHistory";
import { LoaderIcon } from "react-hot-toast";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";
import { format } from "date-fns";
import { Tag } from "antd";

const UserCancleLeave = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetUserLeaveHistory(id);
  const allLeaves = data?.userAllLeaves[0]?.leaves;
  const CancledLeaves = allLeaves?.filter(
    (leave) => leave?.leaveStatus == "Cancelled"
  );

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Leave Reason",
      dataIndex: "leaveReason",
      key: "leaveReason",
      render: (reason) =>
        reason.length > 20 ? `${reason.substring(0, 30)}...` : reason,
    },
    {
      title: "Cancel Reason",
      dataIndex: "cancleReason",
      key: "cancleReason",
      render: (reason) =>
        reason.length > 20 ? `${reason.substring(0, 30)}...` : reason,
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
      render: (date) => format(new Date(date), "d-MM-yyyy"),
    },
    {
      title: "Cancelled date",
      dataIndex: "cancleDate",
      key: "cancleDate",
      render: (date) => (date ? format(new Date(date), "d-MM-yyyy") : ""),
    },
    {
      title: "Leave Start",
      dataIndex: "leaveStart",
      key: "leaveStart",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
    },
    {
      title: "Leave End",
      dataIndex: "leaveEnd",
      key: "leaveEnd",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
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
    <div className="p-5">
      {isPending && <LoaderIcon />}
      <UserLeaveHistory userleave={CancledLeaves} columns={columns} />
    </div>
  );
};

export default UserCancleLeave;
