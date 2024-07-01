import React from "react";
import { Table } from "antd";
import getUserIdRole from "../../utils/getUserIdRole";
import useGetKitdetails from "../../features/joiningKit/useGetKitdetails";
import { format } from "date-fns";

const JoiningKit = () => {
  const { id } = getUserIdRole();
  const { data, isPending } = useGetKitdetails(id);
  const KitData = data?.kits;
  console.log(KitData);
  const KitdatColumns = [
    {
      title: "Accessory Name",
      dataIndex: "accessoryName",
      key: "accessoryName",
    },
    {
      title: "Accessory Company",
      dataIndex: "accessoryCompany",
      key: "accessoryCompany",
    },
    {
      title: "Accessory Id",
      dataIndex: "accessoryId",
      key: "accessoryId",
    },
    {
      title: "Assigned Date",
      dataIndex: "assignDate",
      key: "assignDate",
      render: (date) => (date ? format(new Date(date), "dd MMM yyyy") : ""),
    },
    {
      title: "Assigned By",
      dataIndex: "assignBy",
      key: "assignBy",
    },
  ];
  return (
    <main>
      <Table dataSource={KitData} columns={KitdatColumns} className="px-5" />
    </main>
  );
};

export default JoiningKit;
