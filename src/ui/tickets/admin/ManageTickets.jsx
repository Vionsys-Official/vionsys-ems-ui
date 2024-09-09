import { useState } from "react";
import useGetAssigneeTicketsById from "../../../features/ticket/useGetAssigneeById";
import getUserIdRole from "../../../utils/getUserIdRole";
import { Button, Modal, Table, Tag, Input } from "antd";
import { CiEdit } from "react-icons/ci";
import EditTicket from "./EditTicket";

const ManageTickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});
  const [searchText, setSearchText] = useState("");
  const { id } = getUserIdRole();
  const { data, isPending } = useGetAssigneeTicketsById(id);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const columns = [
    {
      title: "Employee Name",
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
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "LOW", value: "LOW" },
        { text: "NORMAL", value: "NORMAL" },
        { text: "HIGH", value: "HIGH" },
      ],
      onFilter: (value, record) => record.priority === value,
      filterSearch: true,
      render: (priority) => {
        let color = "";
        switch (priority) {
          case "LOW":
            color = "#FF6600";
            break;
          case "NORMAL":
            color = "#3399FF";
            break;
          case "HIGH":
            color = "#FF0000";
            break;
          default:
            break;
        }
        return (
          <Tag color={color} key={priority}>
            {priority}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "CLOSED", value: "CLOSED" },
      ],
      onFilter: (value, record) => record.status === value,
      filterSearch: true,
      render: (status) => {
        let color = "";
        switch (status) {
          case "OPEN":
            color = "#FAAD14";
            break;
          case "CLOSED":
            color = "darkred";
            break;
          default:
            break;
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
      render: (_, record) => (
        <Button
          type="link"
          icon={<CiEdit size={25} />}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  const dataSource = data
    ?.map((ticket) => {
      const ticketId = ticket._id;
      const name = ticket.ticketRaiserFullName;
      const email = ticket.ticketRaiser.email;
      const designation = ticket.ticketRaiser.designation;
      const ticketType = ticket.ticketType;
      const description = ticket.description;
      const priority = ticket.priority;
      const status = ticket.status;
      return {
        ticketId,
        name,
        email,
        designation,
        ticketType,
        description,
        priority,
        status,
      };
    })
    .filter((ticket) => ticket.name.toLowerCase().includes(searchText));

  const handleEdit = (record) => {
    setIsModalOpen(!isModalOpen);
    setRecord(record);
  };

  return (
    <div className="w-full flex flex-col  h-full p-4">
      <h2 className="text-xl font-semibold text-black dark:text-white mb-2">All Tickets</h2>
      <Input
        className="dark:bg-slate-400 border-2 border-blue-200"
        placeholder="Search Tickets by Employee Name"
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 400 }}
      />
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
        className="dark:bg-slate-400"
      >
        <EditTicket
          record={record}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ManageTickets;
