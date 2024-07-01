import React, { useState } from "react";
import useGetLeaveRequests from "../../features/leaves/useGetLeaveRequests";
import { LoaderIcon } from "react-hot-toast";
import { Button, Input, Table, Tag } from "antd";
import { format } from "date-fns";
import getUserIdRole from "../../utils/getUserIdRole";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminLeaveModal from "../../ui/leavesUI/AdminLeaveModal";

const AdminLeavePage = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [leavedata, setleavedata] = useState({});
  const [searchName, setSearchName] = useState("");

  const { id } = getUserIdRole();
  const { data, isPending } = useGetLeaveRequests(id);
  const AllLeaves = data?.AllLeaves;
  // the cloumns in admin leaves page
  const columns = [
    {
      title: "User ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
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
      title: "Action",
      dataIndex: "",
      key: "user",
      render: (record) => (
        <Button
          icon={<BsThreeDotsVertical />}
          onClick={() => handleCancelLeave(record)}
        />
      ),
    },
  ];
  // the data of admin laves page
  const dataSource = [];

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
  const sorteduserLeaves = dataSource?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const handleCancelLeave = (record) => {
    setleavedata(record);
    setmodalOpen(true);
  };

  return (
    <div className="px-5">
      <AdminLeaveModal
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
        leavedata={leavedata}
      />
      <Input
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      {isPending && <LoaderIcon />}
      {AllLeaves && <Table columns={columns} dataSource={sorteduserLeaves} />}
    </div>
  );
};

export default AdminLeavePage;
