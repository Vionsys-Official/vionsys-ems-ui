import React from "react";
import { Button, Form, Input, Select } from "antd";
import useCreateResignation from "../../../features/resignation/useCreateResignation";
import getUserIdRole from "../../../utils/getUserIdRole";

const { TextArea } = Input;

const CreateResignation = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const { id: userId } = getUserIdRole();
  const { createResignation, isLoading } = useCreateResignation(); // Using the custom hook

  const handleSubmit = (resignationData) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const data = {
      ...resignationData,
      user: userId,
    };
    createResignation(data, {
      onSuccess: () => {
        form.resetFields(); // Clear the form fields after successful submission
      },
    });
  };

  return (
    <div
      className="bg-white p-3 rounded-md font-medium"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h1 className="text-center text-xl font-bold mb-3 text-[#7498D0]">
        Vionsys Resignation Application Form
      </h1>
      <Form
        form={form}
        name="resignationForm"
        onFinish={handleSubmit}
        layout="vertical"
        className="flex flex-col"
      >
        <Form.Item
          label="Select Resignation Type"
          name="resignationType"
          className="w-full"
          rules={[
            { required: true, message: "Please select resignation type" },
          ]}
        >
          <Select placeholder="Resignation Type">
            <Select.Option value="Resign with Notice period">
              Resign with Notice period
            </Select.Option>
            <Select.Option value="Resign without Notice period">
              Resign without Notice period
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Enter Notice Period Days"
          name="noticePeriodDays"
          rules={[
            { required: true, message: "Please enter notice period days" },
          ]}
        >
          <Input
            placeholder="Notice Period Days"
            type="number"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label="Reason for Resignation"
          name="resignationReason"
          rules={[
            { required: true, message: "Please enter your resignation reason" },
          ]}
        >
          <TextArea rows={4} placeholder="Enter your reason for resignation" />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item>
            <Button
              disabled={isLoading}
              type="primary"
              className="bg-[#7498D0] hover:bg-slate-500"
              htmlType="submit"
            >
              Submit Resignation
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => form.resetFields()}
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

export default CreateResignation;
