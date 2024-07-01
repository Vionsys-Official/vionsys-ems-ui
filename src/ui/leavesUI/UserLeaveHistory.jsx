import React from "react";
import { Table, Tag } from "antd";
import { format } from "date-fns";

const UserLeaveHistory = (props) => {
  const { userleave, columns } = props;

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={userleave} columns={columns} className="" />
      </div>
    </>
  );
};

export default UserLeaveHistory;
