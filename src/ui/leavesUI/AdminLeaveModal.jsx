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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // create form in admin

  const handleSubmit = (values) => {
    const { note, leaveAdminstatus } = values;
    if (leaveAdminstatus === "Approved") {
      approveLeave(
        { leaveId, userId, note },
        {
          onSettled: () => {
            setmodalOpen(false);
            form.resetFields(); // Reset form fields after operation completes
          },
        }
      );
      return;
    } else {
      rejectLeave(
        { leaveId, userId, note },
        {
          onSettled: () => {
            setmodalOpen(false);
            form.resetFields(); // Reset form fields after operation completes
          },
        }
      );
      return;
    }
  };

  const [form] = Form.useForm();

  return (
    <main className="">
      <Modal
        open={modalOpen}
        footer={false}
        closeIcon={<HiXCircle size={25} onClick={() => setmodalOpen(false)} />}
        className="font-medium"
      >
        <h1 className="text-xl font-bold text-center mb-6 text-[#7498D0]">
          Employee Leave Request
        </h1>
        <Form
          form={form}
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
            <Form.Item label="Applied For Days" name="days" className="w-full">
              <Input
                type="text"
                defaultValue={leavedata?.leaveDays}
                disabled={true}
                color="black"
              />
            </Form.Item>
          </div>
          <div className="firstrow flex gap-5">
            <Form.Item
              label="Leave Start Date"
              name="duration"
              className="w-full"
            >
              <Input
                type="text"
                defaultValue={formatDate(leavedata?.leaveStart)}
                disabled={true}
                color="black"
              />
            </Form.Item>
            <Form.Item
              label="Leave End Date"
              name="duration"
              className="w-full"
            >
              <Input
                type="text"
                defaultValue={formatDate(leavedata?.leaveEnd)}
                disabled={true}
                color="black"
              />
            </Form.Item>
          </div>
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
            label="Select Leave Status"
            name="leaveAdminstatus"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select placeholder="Select Status">
              <Select.Option value="Approved">Approved</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Enter Leave Note"
            name="note"
            rules={[{ required: true }]}
          >
            <TextArea rows={2} placeholder="Provide Leave Note Here" />
          </Form.Item>

          <Button
            disabled={isPending || reajectPending}
            type="primary"
            className="bg-[#7096d3]"
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
