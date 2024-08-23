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
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const handleCancelLeave = (user, record) => {
    if (record.leaveStatus === "Pending" || record.leaveStatus === "Approved") {
      setmodal(true);
      setleaveUser(user);
      setleaveId(record?._id);
      setIsFormDisabled(false);
    } else {
      toast.error("Only pending & approved leaves can be cancelled.");
      setIsFormDisabled(true);
    }
  };

  const handleCancelLeaveSumbit = () => {
    if (!cancleReason) {
      toast.error("please provide the leave cancle reason");
      return;
    }
    cancleRequest({ user: leaveUser, leaveId, cancleReason });
    setmodal(false);
    setcancleReason("");
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
      filters: [
        { text: "Rejected", value: "Rejected" },
        { text: "Expired", value: "Expired" },
        { text: "Cancelled", value: "Cancelled" },
        { text: "Approved", value: "Approved" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.leaveStatus === value,
      filterSearch: true,
      render: (leaveStatus) => {
        let color = "";
        switch (leaveStatus) {
          case "Pending":
            color = "#FAAD14";
            break;
          case "Approved":
            color = "darkgreen";
            break;
          case "Rejected":
            color = "darkred";
            break;
          case "Cancelled":
            color = "black";
            break;
          default:
            color = "gray";
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
    <section className="py-5">
      <main className="p-5 gap-4 mb-5 admin-leave-page-container">
      <div className="border-2 rounded-lg border-blue-200">
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
              disabled={isFormDisabled}
            />
            <Button
              type="primary"
              danger
              className="text-red-600 hover:bg-red-600 hover:text-white"
              onClick={handleCancelLeaveSumbit}
              disabled={isFormDisabled}
            >
              Cancel Leave
            </Button>
          </div>
        </Modal>

        <div style={{ overflowX: "auto" }}>
          <UserLeaveHistory userleave={sorteduserLeaves} columns={columns} />
        </div>
      </div>
    </main>
    </section>
  );
};

export default LeavesHistory;
