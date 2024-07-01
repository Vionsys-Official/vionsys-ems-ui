import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { HiXCircle } from "react-icons/hi";
import { useApproveLeave } from "../../features/leaves/useApproveLeave";
import { useRejectLeave } from "../../features/leaves/useRejectLeave";

const AdminLeaveModal = (props) => {
  const { approveLeave, isPending } = useApproveLeave();
  const { rejectLeave, reajectPending } = useRejectLeave();
  const { modalOpen, setmodalOpen, leavedata } = props;
  const { _id: leaveId, user: userId } = leavedata;

  // create form in admin

  const handleSubmit = (values) => {
    const { note, leaveAdminstatus } = values;

    if (leaveAdminstatus === "Approved") {
      approveLeave(
        { leaveId, userId, note },
        {
          onSettled: () => setmodalOpen(false),
        }
      );
      return;
    } else {
      rejectLeave(
        { leaveId, userId, note },
        {
          onSettled: () => setmodalOpen(false),
        }
      );
      return;
    }
  };

  return (
    <main>
      <Modal
        title="Employee Leave Request"
        open={modalOpen}
        footer={false}
        closeIcon={<HiXCircle size={25} onClick={() => setmodalOpen(false)} />}
      >
        <Form
          name="Admin_Leave_Form"
          onFinish={handleSubmit}
          layout="vertical"
          className="flex flex-col"
        >
          <div className="firstrow flex gap-5">
            <Form.Item
              label="Employee Email"
              name="employee_name"
              className="w-full"
            >
              <Input
                type="text"
                defaultValue={leavedata?.email}
                disabled={true}
                color="black"
              />
            </Form.Item>
            <Form.Item label="Applied for days" name="days" className="w-full">
              <Input
                type="text"
                defaultValue={leavedata?.leaveDays}
                disabled={true}
                color="black"
              />
            </Form.Item>
          </div>
          <Form.Item label="leave Duration" name="duration" className="w-full">
            <Input
              type="text"
              defaultValue={`${leavedata?.leaveStart?.slice(
                0,
                10
              )} - ${leavedata?.leaveEnd?.slice(0, 10)}`}
              disabled={true}
              color="black"
            />
          </Form.Item>
          <Form.Item label="Leave Reasons" name="reason" className="w-full">
            <Input
              type="text"
              defaultValue={leavedata?.leaveReason}
              disabled={true}
              color="black"
            />
          </Form.Item>
          <Form.Item
            className="w-full"
            label="Select leave status"
            name="leaveAdminstatus"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select>
              <Select.Option value="Approved">Approve</Select.Option>
              <Select.Option value="Rejected">Reject</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="enter leave note "
            name="note"
            rules={[{ required: true, message: "Please enter note" }]}
          >
            <TextArea rows={2} placeholder="reason for leave request" />
          </Form.Item>

          <Button
            disabled={isPending || reajectPending}
            type="primary"
            className="bg-slate-600 hover:bg-slate-500"
            htmlType="submit"
          >
            Update
          </Button>
        </Form>
      </Modal>
    </main>
  );
};

export default AdminLeaveModal;
