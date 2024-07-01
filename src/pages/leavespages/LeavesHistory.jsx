import React, { useReducer, useState } from "react";
import UserLeaveHistory from "../../ui/leavesUI/UserLeaveHistory";
import useGetUserLeaveHistory from "../../features/leaves/useGetUserLeaveHistory";
import getUserIdRole from "../../utils/getUserIdRole";
import toast, { LoaderIcon } from "react-hot-toast";
import { format } from "date-fns";
import { MdOutlineCancel } from "react-icons/md";
import { Button, Form, Input, Modal, Tag } from "antd";
import useCancleLeaveRequest from "../../features/leaves/useCancleLeaveRequest";
import { HiXCircle } from "react-icons/hi";

const LeavesHistory = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetUserLeaveHistory(id);
  const { cancleRequest } = useCancleLeaveRequest();
  const userleave = data?.userAllLeaves[0]?.leaves;
  const sorteduserLeaves = userleave?.sort(
    (a, b) => new Date(b?.date) - new Date(a?.date)
  );
  const [leaveUser, setleaveUser] = useState("");
  const [leaveId, setleaveId] = useState("");
  const [modal, setmodal] = useState(false);
  const [cancleReason, setcancleReason] = useState("");

  const handleCancelLeave = (user, record) => {
    setmodal(true);
    setleaveUser(user);
    setleaveId(record?._id);
  };

  const handleCancelLeaveSumbit = () => {
    if (!cancleReason) {
      toast.error("please provide the leave cancle reason");
      return;
    }
    cancleRequest({ user: leaveUser, leaveId, cancleReason });
  };

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
        reason.length > 20 ? `${reason.substring(0, 20)}...` : reason,
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
      title: "Floater Date",
      dataIndex: "floaterDay",
      key: "floaterDay",
      render: (floaterDay) => (floaterDay ? floaterDay : "NA"),
    },
    {
      title: "Request date",
      dataIndex: "date",
      key: "date",
      render: (date) => format(new Date(date), "d-MM-yyyy"),
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
        let color = "";
        switch (leaveStatus) {
          case "Pending":
            color = "yellow";
            break;
          case "Approved":
            color = "green";
            break;
          case "Rejected":
            color = "red";
            break;
          default:
            color = "";
        }
        return (
          <Tag color={color} key={leaveStatus}>
            {leaveStatus}
          </Tag>
        );
      },
    },
    {
      title: "Note By Admin",
      dataIndex: "noteByAdmin",
      key: "noteByAdmin",
    },
    {
      title: "Leave Cancel",
      dataIndex: "user",
      key: "user",
      render: (user, record) => (
        <Button
          icon={<MdOutlineCancel size={25} />}
          onClick={() => handleCancelLeave(user, record)}
        />
      ),
    },
  ];

  return (
    <main className="p-5">
      {isPending && <LoaderIcon />}

      <Modal
        title="Cancel Leave Request"
        open={modal}
        footer={false}
        closeIcon={<HiXCircle size={25} onClick={() => setmodal(false)} />}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-red-700">
            Do you really want to cancel this leave request ?
          </h1>
          <Input
            onChange={(e) => setcancleReason(e.target.value)}
            value={cancleReason}
            placeholder="Reason"
          />
          <Button
            type="primary"
            danger
            className="text-red-600 hover:bg-red-600 hover:text-white"
            onClick={handleCancelLeaveSumbit}
          >
            Cancel Leave
          </Button>
        </div>
      </Modal>

      <div style={{ overflowX: "auto" }}>
        <UserLeaveHistory userleave={sorteduserLeaves} columns={columns} />
      </div>
    </main>
  );
};

export default LeavesHistory;
