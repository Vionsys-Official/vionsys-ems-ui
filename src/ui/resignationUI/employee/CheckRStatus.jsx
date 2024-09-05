import React, { useState } from "react";
import { Button, Table, Tag, Modal, Input } from "antd";
import getUserIdRole from "../../../utils/getUserIdRole";
import useGetResignationById from "../../../features/resignation/useGetResignationById";
import useCancleResignation from "../../../features/resignation/useCancleResignation";
import { format } from "date-fns";
import { MdOutlineCancel } from "react-icons/md";

const shouldShowNoteByAdmin = (data) => {
  return data.some(
    (item) =>
      item.resignationStatus === "Approved" ||
      item.resignationStatus === "Rejected"
  );
};

const CheckRStatus = ({ data }) => {
  const { cancleResignation, isCanclePending } = useCancleResignation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cancleReason, setCancleReason] = useState("");
  const [currentRecord, setCurrentRecord] = useState(null);

  const showNoteByAdminColumn = shouldShowNoteByAdmin(data);

  const handleCancelClick = (record) => {
    if (record.resignationStatus === "Pending") {
      setCurrentRecord(record);
      setModalVisible(true);
    } else {
      // Handle the case where resignation status isn't "Pending"
      console.error("Only pending resignations can be canceled.");
    }
  };

  const handleCancelResignation = () => {
    if (!cancleReason) {
      console.error("Please provide a reason for cancellation.");
      return;
    }

    if (currentRecord) {
      cancleResignation({
        resignationId: currentRecord.key, // Use the resignation ID
        reason: cancleReason, // Ensure the key matches the backend's expected field name
      });
      setModalVisible(false);
      setCancleReason("");
    }
  };

  const columns = [
    {
      title: "Applied Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Resignation Type",
      dataIndex: "resignationType",
      key: "resignationType",
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriodDays",
      key: "noticePeriodDays",
      render: (text) => (
        <span className="text-sm">
          {text !== undefined ? `${text} days` : "N/A"}
        </span>
      ),
    },
    {
      title: "Resignation Status",
      key: "resignationStatus",
      dataIndex: "resignationStatus",
      render: (status) => {
        let color;
        if (status === "Approved") {
          color = "green";
        } else if (status === "Rejected") {
          color = "volcano";
        } else if (status === "Pending") {
          color = "geekblue";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    ...(showNoteByAdminColumn
      ? [
        {
          title: "Note by Admin",
          dataIndex: "noteByAdmin",
          key: "noteByAdmin",
        },
      ]
      : []),
    {
      title: "Exit Date",
      dataIndex: "exitDate",
      key: "exitDate",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Cancel",
      dataIndex: "user",
      key: "user",
      render: (user, record) => (
        <Button
          icon={<MdOutlineCancel size={25} />}
          onClick={() => handleCancelClick(record)}
          loading={isCanclePending}
          disabled={record.resignationStatus !== "Pending"}
        />
      ),
    },
  ];

  return (
    <div className="mt-6">
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Cancel Resignation"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-red-700">
            Are you sure you want to cancel this resignation request?
          </h1>
          <Input
            onChange={(e) => setCancleReason(e.target.value)}
            value={cancleReason}
            placeholder="Cancellation Reason"
          />
          <Button
            type="primary"
            danger
            className="text-red-600 hover:bg-red-600 hover:text-white"
            onClick={handleCancelResignation}
            disabled={isCanclePending}
          >
            Cancel Resignation
          </Button>
        </div>
      </Modal>
    </div>
  );
};


export default function App() {
  const { id: userId } = getUserIdRole();
  const { data, isLoading } = useGetResignationById(userId);

  if (isLoading) return <div>Loading...</div>;

  const dataSource = Array.isArray(data?.data)
    ? data.data.map((item) => ({
      key: item._id,
      resignationType: item.resignationType,
      noticePeriodDays: item.noticePeriodDays,
      noteByAdmin: item.noteByAdmin,
      resignationStatus: item.resignationStatus,
      date: item.date ? format(new Date(item.date), "dd-MM-yyyy") : "NA",
      exitDate: item.exitDate
        ? format(new Date(item.exitDate), "dd-MM-yyyy")
        : "NA",
      userId: item.user._id, // Ensure userId is correctly extracted
    }))
    : [];

  return <CheckRStatus data={dataSource} />;
}
