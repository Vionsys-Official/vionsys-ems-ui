import React, { useState } from "react";
import useGetLeaveRequests from "../../features/leaves/useGetLeaveRequests";
import { LoaderIcon } from "react-hot-toast";
import { Button, Input, Table, Tag } from "antd";
import { format } from "date-fns";
import getUserIdRole from "../../utils/getUserIdRole";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import AdminLeaveModal from "../../ui/leavesUI/AdminLeaveModal";
import "../../utils/css/AdminLeavePage.css";
import { SearchOutlined } from "@ant-design/icons";
import withAuth from "../../store/withAuth";

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
      title: "Emp Name",
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
      title: "Request Date",
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
      title: "Note By Admin",
      dataIndex: "noteByAdmin",
      key: "noteByAdmin",
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
  const sorteduserLeaves = dataSource?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleCancelLeave = (record) => {
    if (record.leaveStatus === "Pending") {
      setleavedata(record);
      setmodalOpen(true);
    } else {
      toast.error(
        `Cannot modify leave request with status: ${record.leaveStatus}.`
      ); //Only pending leave requests can be approved or rejected.
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <section className="py-5">
      <div className="gap-4 mb-5 admin-leave-page-container">
        <AdminLeaveModal
          modalOpen={modalOpen}
          setmodalOpen={setmodalOpen}
          leavedata={leavedata}
        />
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
        {isPending && <LoaderIcon />}
        {AllLeaves && (
          <Table
            className="admin-leave-table"
            columns={columns}
            dataSource={sorteduserLeaves}
            onChange={onChange}
          />
        )}
      </div>
    </section>
  );
};

export default withAuth(AdminLeavePage, ['admin']);
