import React from "react";
import { Table, Tag } from "antd";
import { format } from "date-fns";
import useGetTicketByEmpId from "../../../features/ticket/useGetTicketByEmpId";
import getUserIdRole from "../../../utils/getUserIdRole";

const EmpOpenTicket = ({ data, isPending }) => {
  const columns = [
    {
      title: "Raised Date",
      dataIndex: "raisedDate",
      key: "raisedDate",
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Ticket Priority",
      dataIndex: "ticketPriority",
      key: "ticketPriority",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Assignee Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "OPEN" ? "geekblue" : "volcano"; // Color based on status
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={data} loading={isPending} />;
};

export default function App() {
  const { id: userId } = getUserIdRole();
  const { data, isPending } = useGetTicketByEmpId(userId);

  console.log("Fetched data:", data);

  const dataSource = Array.isArray(data?.data)
    ? data.data
        .filter((item) => item.status === "OPEN") // Only include closed tickets
        .map((item) => ({
          key: item._id,
          raisedDate: item.ticketRaisedDate
            ? format(new Date(item.ticketRaisedDate), "dd-MM-yyyy")
            : "NA",
          ticketType: item.ticketType,
          ticketPriority: item.priority,
          description: item.description,
          assignedTo: item.ticketAssignedToFullName,
          designation:item.ticketAssignedTo.designation,
          status: item.status,
        }))
    : [];

  console.log("Data source:", dataSource);

  return <EmpOpenTicket data={dataSource} isPending={isPending} />;
}
