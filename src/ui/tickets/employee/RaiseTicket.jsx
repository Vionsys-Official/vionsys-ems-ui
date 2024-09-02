import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
const { TextArea } = Input;
import getUserIdRole from "../../../utils/getUserIdRole";
import useCreateTicket from "../../../features/ticket/useCreateTicket";
import useGetAllUsers from "../../../features/users/useGetAllUsers";

const RaiseTicket = () => {
  const [form] = Form.useForm();
 const {allUsers}= useGetAllUsers();
   const dataUsers=allUsers?.data?.users?.filter((user)=>user.role === 'admin');
  
  // const [isPending, setIsPending] = useState(false);
  const { raiseTicket, isPending } = useCreateTicket();
  const { id: userId } = getUserIdRole();
  const handleSubmit = (values) => {
    console.log(values)
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    const data = {
      ...values,
      ticketRaiser: userId,
    };
   console.log(data)
    // You can add the API call or submission logic here
    raiseTicket(data, {
      onSuccess: () => {
        form.resetFields();
      },
    });

    
  };

  return (
    <div
      className="bg-white p-3 rounded-md font-medium"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h1 className="text-center text-lg font-bold mb-3 text-[#7498D0]">
        Vionsys Raise Ticket Form
      </h1>
      <Form
        form={form}
        name="ticketForm"
        onFinish={handleSubmit} // Use onFinish to handle form submission
        layout="vertical"
        size="small"
        className="flex flex-col"
      >
        <Form.Item
          label="Ticket Type"
          name="ticketType"
          className="w-full"
          rules={[{ required: true, message: "Please select ticket type" }]}
        >
          <Select placeholder="Ticket Type">
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
          className="w-full"
          rules={[{ required: true, message: "Please select priority" }]}
        >
          <Select placeholder="Priority">
            <Select.Option value="LOW">Low</Select.Option>
            <Select.Option value="NORMAL">Medium</Select.Option>
            <Select.Option value="HIGH">High</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Assign to"
          name="ticketAssignedTo"
          className="w-full"
          rules={[{ required: true, message: "Please select the assignee" }]}
        >
          <Select listHeight={300} placeholder="Assign to">
            {
              dataUsers?.map((user)=>(
                <Select.Option key={user._id} value={user._id} className="flex flex-col justify-between w-full gap-3">
                  <span>{user.firstName+' '+user.lastName}</span>
                  {/* <span>{user.designation}</span> */}
                </Select.Option>
              ))
            }
            {/* <Select.Option value="HR Admin">HR Admin</Select.Option>
            <Select.Option value="Technical Admin">
              Technical Admin
            </Select.Option>
            <Select.Option value="Data Admin">Data Admin</Select.Option> */}
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the ticket description" },
          ]}
        >
          <TextArea rows={3} placeholder="Enter ticket description" />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item>
            <Button
              type="primary"
              className="bg-[#7498D0] hover:bg-slate-500"
              htmlType="submit"
            >
              {
                isPending ? "Submitting..":"Submit"
              }
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
            onClick={()=>form.resetFields()}
              type="text"
              className="bg-[#f75341] text-white hover:bg-red-700"
              htmlType="reset"
            >
              Clear
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default RaiseTicket;
