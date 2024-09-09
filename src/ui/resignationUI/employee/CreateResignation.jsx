import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import useCreateResignation from "../../../features/resignation/useCreateResignation";
import getUserIdRole from "../../../utils/getUserIdRole";

const { TextArea } = Input;

const CreateResignation = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const { id: userId } = getUserIdRole();
  const { createResignation, isLoading } = useCreateResignation(); // Using the custom hook

  const [isNoticePeriodDisabled, setIsNoticePeriodDisabled] = useState(); // State to manage disabling of the notice period input

  // Handle resignation type change
  const handleResignationTypeChange = (value) => {
    if (value === "Resign without Notice period") {
      setIsNoticePeriodDisabled(true); // Disable the notice period input
      form.setFieldsValue({ noticePeriodDays: 0 }); // Clear the notice period field
    } else {
      setIsNoticePeriodDisabled(false); // Enable the notice period input
    }
  };

  const handleSubmit = (resignationData) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const data = {
      ...resignationData,
      user: userId,
    };

    // Confirmation dialog before submitting the resignation
    Modal.confirm({
      title: "Are you sure you want to apply for resignation?",
      content: "",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        createResignation(data, {
          onSuccess: () => {
            form.resetFields(); // Clear the form fields after successful submission
          },
        });
      },
    });
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white py-4 px-6 shadow-lg rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-[#7498D0] mb-6">
          Vionsys Resignation Application
        </h1>
        <Form
          form={form}
          name="resignationForm"
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-4"
        >
          {/* Resignation Type Selection */}
          <Form.Item
            label="Select Resignation Type"
            name="resignationType"
            rules={[
              { required: true, message: "Please select resignation type" },
            ]}
          >
            <Select
              placeholder="Choose Type"
              className="rounded-lg"
              onChange={handleResignationTypeChange} // Listen for changes
            >
              <Select.Option value="Resign with Notice period">
                Resign with Notice period
              </Select.Option>
              <Select.Option value="Resign without Notice period">
                Resign without Notice period
              </Select.Option>
            </Select>
          </Form.Item>

          {/* Notice Period Input */}
          <Form.Item
            label="Notice Period Days"
            name="noticePeriodDays"
            rules={[
              {
                required: !isNoticePeriodDisabled, // Only required if the notice period is not disabled
                message: "Please enter notice period days",
              },
            ]}
          >
            <Input
              placeholder="Enter Days"
              type="number"
              className="rounded-lg"
              disabled={isNoticePeriodDisabled} // Disable the field based on selection
            />
          </Form.Item>

          {/* Reason for Resignation */}
          <Form.Item
            label="Reason for Resignation"
            name="resignationReason"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <TextArea
              rows={4}
              placeholder="Explain your reason"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item>
              <Button
                disabled={isLoading}
                type="primary"
                className="bg-[#7498D0] hover:bg-slate-600 px-6 py-2 rounded-lg text-white flex justify-center items-center"
                htmlType="submit"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={() => form.resetFields()}
                type="text"
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white flex justify-center items-center"
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

export default CreateResignation;
