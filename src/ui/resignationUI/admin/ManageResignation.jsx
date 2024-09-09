import React, { useState } from "react";
import { Button, Modal, Table, Tag } from "antd";
import useGetAllResignation from "../../../features/resignation/useGetAllResignations";
import { CiEdit } from "react-icons/ci";
import ChangeStatus from "./ChangeStatus";
import { format } from "date-fns";

const ManageResignation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});
  const { data, isPending } = useGetAllResignation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Type",
      dataIndex: "resignationType",
      key: "resignationType",
    },
    {
      title: "Reason",
      dataIndex: "resignationReason",
      key: "resignationReason",
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
      title: "Applied Date",
      dataIndex: "formattedDate",
      key: "formattedDate",
    },
    {
      title: "Status",
      key: "resignationStatus",
      dataIndex: "resignationStatus",
      render: (status) => {
        let color;
        if (status === "Approved") {
          color = "green";
        } else if (status === "Rejected") {
          color = "volcano";
        } else if (status === "Pending") {
          color = "yellow";
        } else if (status === "Canceled") {
          color = "gray";
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, record) => {
        // Disable edit button for Approved and Rejected status
        const isDisabled =
          record.resignationStatus === "Approved" ||
          record.resignationStatus === "Rejected" ||
          record.resignationStatus === "Canceled";

        return (
          <Button
            type="link"
            icon={<CiEdit size={25} />}
            onClick={() => handleEdit(record)}
            disabled={isDisabled} // Disable the button based on status
          />
        );
      },
    },
  ];

  const dataSource = Array.isArray(data?.data)
  ? data.data
      .map((resignation) => {
        const {
          _id,
          resignationType,
          noticePeriodDays,
          resignationReason,
          resignationStatus,
          date,
          userDetails,
          statusUpdatedAt, // New field for tracking status update time
        } = resignation;

        const name = `${userDetails?.firstName || ""} ${
          userDetails?.lastName || ""
        }`;
        const email = userDetails?.email || "";
        const designation = userDetails?.designation || "";

        return {
          key: _id,
          _id, // Required for passing to ChangeStatus
          name,
          email,
          designation,
          resignationType,
          resignationReason,
          noticePeriodDays,
          date: date ? new Date(date) : null, // Use raw date for sorting
          formattedDate: date ? format(new Date(date), "dd-MM-yyyy") : "NA", // For display
          resignationStatus,
          statusUpdatedAt: statusUpdatedAt ? new Date(statusUpdatedAt) : null, // Track status update time
          user: resignation.user, // Required for passing to ChangeStatus
          noteByAdmin: "", // Required for passing to ChangeStatus
        };
      })
      // Sort by status update time, if available, otherwise by creation date
      .sort((a, b) => {
        const dateA = a.statusUpdatedAt || a.date;
        const dateB = b.statusUpdatedAt || b.date;
        return dateB - dateA; // Newest resignations or updates appear first
      })
  : [];

  const handleEdit = (record) => {
    setIsModalOpen(!isModalOpen);
    setRecord(record);
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">All Resignations</h2>
      {isPending ? (
        <div>Loading....</div>
      ) : (
        <Table columns={columns} dataSource={dataSource} />
      )}
      <Modal
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ChangeStatus
          record={record}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ManageResignation;

