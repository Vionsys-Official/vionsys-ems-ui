import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
const { TextArea } = Input;
import getUserIdRole from "../../../utils/getUserIdRole";
import useCreateTicket from "../../../features/ticket/useCreateTicket";
import useGetAllUsers from "../../../features/users/useGetAllUsers";
import withAuth from "../../../store/withAuth";

const RaiseTicket = () => {
  const [form] = Form.useForm();
  const { allUsers } = useGetAllUsers();
  const dataUsers = allUsers?.data?.users?.filter(
    (user) => user.role === "admin"
  );
  const { raiseTicket, isPending } = useCreateTicket();
  const { id: userId } = getUserIdRole();
  const handleSubmit = (values) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    const data = {
      ...values,
      ticketRaiser: userId,
    };
    raiseTicket(data, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <div className="flex justify-center md:h-[90vh] py-5">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-[#7498D0] mb-6">
          Vionsys Raise Ticket Form
        </h1>
        <Form
          form={form}
          name="ticketForm"
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Ticket Type"
            name="ticketType"
            rules={[{ required: true, message: "Please select ticket type" }]}
          >
            <Select
              placeholder="Select Ticket Type"
              className="w-full rounded-lg"
            >
              <Select.Option value="INCIDENT">Incident</Select.Option>
              <Select.Option value="REQUEST">Request</Select.Option>
              <Select.Option value="SUPPORT">Support</Select.Option>
              <Select.Option value="ATTENDANCE">Attendance</Select.Option>
              <Select.Option value="COMPLAINT">Complaint</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "Please select priority" }]}
          >
            <Select placeholder="Select Priority" className="w-full rounded-lg">
              <Select.Option value="LOW">Low</Select.Option>
              <Select.Option value="NORMAL">Medium</Select.Option>
              <Select.Option value="HIGH">High</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Assign to"
            name="ticketAssignedTo"
            rules={[{ required: true, message: "Please select the assignee" }]}
          >
            <Select placeholder="Select Assignee" className="w-full rounded-lg">
              {dataUsers?.map((user) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.firstName + " " + user.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the ticket description",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the issue"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item>
              <Button
                type="primary"
                className="bg-[#7498D0] hover:bg-slate-600 px-6 rounded-lg text-white text-center"
                htmlType="submit"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={() => form.resetFields()}
                type="text"
                className="bg-red-500 hover:bg-red-700 px-6 rounded-lg text-center text-white"
              >
                Clear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withAuth(RaiseTicket, ["user"]);
