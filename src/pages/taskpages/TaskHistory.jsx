import React, { useEffect, useState } from "react";
import useGetAllTasks from "../../features/task/useGetAllTasks";
import { format } from "date-fns";
import { Modal, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Import to reset styles

const TaskHistory = () => {
  const [modalData, setModalData] = useState({
    visible: false,
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleModalOpen = (description) => {
    setModalData({ visible: true, description });
  };

  const handleModalClose = () => {
    setModalData({ visible: false, description: "" });
  };

  const columns = [
    {
      title: "SR no",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      hidden: true,
    },
    {
      title: "EMP ID",
      dataIndex: "employeeId",
      key: "employeeId",
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
      width:110,
    },
    {
      title: "EMP Name",
      dataIndex: "assignedTo",
      key: "assignedTo",
      width: 120,
      render: (_, { assignedTo }) => (
        <Tooltip title={`${assignedTo.firstName} ${assignedTo.lastName}`}>
          <span className="font-semibold">
            {assignedTo.firstName} {assignedTo.lastName}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Link
          className="text-blue-400"
          onClick={() => handleModalOpen(record.description)}
        >
          {record.title}
        </Link>
      ),
    },
    {
      title: "Assigned By",
      dataIndex: "assignedBy",
      key: "assignedBy",
      render: (_, { assignedBy }) => (
        <span className="font-semibold">
          {assignedBy.firstName} {assignedBy.lastName}
        </span>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      sorter: (a, b) => new Date(a.deadline) - new Date(b.deadline),
    },
    {
      title: "Starting Date",
      dataIndex: "startedDate",
      key: "startedDate",
    },
    {
      title: "Completion Date",
      dataIndex: "completedDate",
      key: "completedDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        const statusMap = {
          PENDING: { color: "darkred", text: "Pending" },
          INPROGRESS: { color: "darkblue", text: "In Progress" },
          COMPLETED: { color: "darkgreen", text: "Completed" },
        };
        return (
          <Tag
            className="w-20 text-center"
            color={statusMap[status].color}
          >
            {statusMap[status].text}
          </Tag>
        );
      },
      filters: [
        { text: "Pending", value: "PENDING" },
        { text: "In Progress", value: "INPROGRESS" },
        { text: "Completed", value: "COMPLETED" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const { data, isPending } = useGetAllTasks();
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredTasks = data?.filter((item) => {
      return (
        item?.assignedTo?.firstName
          .toLowerCase()
          ?.includes(query?.toLowerCase()) ||
        item?.assignedTo?.lastName
          .toLowerCase()
          ?.includes(query?.toLowerCase()) ||
        item?.employeeId?.toLowerCase()?.includes(query?.toLowerCase())
      );
    });
    setTasks(filteredTasks);
  };

  const dataSource = tasks
    ?.map((item) => ({
      key: item._id,
      id: item._id,
      title: item.title,
      description: item.description,
      assignedBy: item.assignedBy,
      assignedTo: item.assignedTo,
      employeeId: item.employeeId,
      deadline: format(new Date(item.deadline), "dd/MM/yyyy"),
      status: item.status,
      startedDate: item.startedDate
        ? format(new Date(item.startedDate), "dd/MM/yyyy")
        : "NA",
      completedDate: item.completedDate
        ? format(new Date(item.completedDate), "dd/MM/yyyy")
        : "NA",
    }))
    ?.sort((a, b) => {
      const statusOrder = {
        PENDING: 1,
        INPROGRESS: 2,
        COMPLETED: 3,
      };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return new Date(a.deadline) - new Date(b.deadline);
    });

  return (
    <section className="p-7 mt-10 bg-white dark:bg-gray-800 rounded w-full shadow-md">
      <div className="flex gap-4 mb-5 border-2 rounded-lg border-blue-200 dark:border-gray-600">
        <Input
          className="p-2"
          placeholder="Search users by ID or name"
          onChange={handleSearch}
          value={searchQuery}
          prefix={<SearchOutlined />}
        />
      </div>
      {isPending ? (
        <h1 className="text-black dark:text-white">Loading....</h1>
      ) : (
        <>
          <Table
            className="border-2 rounded-lg border-blue-200 dark:border-gray-800"
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
          />
          <Modal
            open={modalData.visible}
            onCancel={handleModalClose}
            footer={null}
            className="dark:bg-gray-700"
          >
            <p className="text-black dark:text-white">
              {modalData.description}
            </p>
          </Modal>
        </>
      )}
    </section>
  );
};

export default TaskHistory;
