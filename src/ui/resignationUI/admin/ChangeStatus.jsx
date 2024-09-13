import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import useUpdateResignationAdmin from "../../../features/resignation/useUpdateResignationAdmin";
import getUserIdRole from "../../../utils/getUserIdRole";

const { Option } = Select;

const ChangeStatus = ({ record, isOpen, setIsOpen }) => {
  const { id: adminId } = getUserIdRole(); // Get the admin ID
  const [form] = Form.useForm();
  const { dataupdateResignation, isPending } = useUpdateResignationAdmin(); // Hook for updating resignation
  const [noticePeriodDays, setNoticePeriodDays] = useState(record.noticePeriodDays || 60); // Track notice period days
  const [isNoticePeriodDisabled, setIsNoticePeriodDisabled] = useState(false); // State to disable notice period field

  // Monitor form changes to disable notice period if status is "Rejected"
  const handleFormChange = ( allValues) => {
    if (allValues.status === "Rejected") {
      setIsNoticePeriodDisabled(true);
    } else {
      setIsNoticePeriodDisabled(false);
    }
  };

  const handleFinish = (values) => {
    if (!values.status) {
      message.error("Please select a status");
      return;
    }

    // Prepare resignation data with notice period days and admin ID
    const resignationData = {
      resignationId: record._id,
      userId: record.user,
      status: values.status,
      note: values.adminNoteOrResolutionNote,
      adminId,
      noticePeriodDays: values.noticePeriodDays || noticePeriodDays, // Use the value entered by admin
    };

    // Call the update resignation hook
    dataupdateResignation(resignationData, {
      onSuccess: () => {
        setIsOpen(!isOpen); // Close the form
        form.resetFields(); // Reset form fields after submission
      },
      // onError: (error) => {
      //   message.error("Failed to update resignation");
      // },
    });
  };

  return (
    <>
      <h3 className="mt-2 mb-4 text-3xl font-semibold text-yellow-500">
        Update Resignation
      </h3>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: record.name || "",
          designation: record.designation || "",
          resignationType: record.resignationType || "",
          status: record.resignationStatus || "",
          noticePeriodDays: noticePeriodDays, // Display notice period days if already available
          adminNoteOrResolutionNote: record.noteByAdmin || "",
        }}
        onValuesChange={handleFormChange} // Handle form changes
        onFinish={handleFinish}
      >
        <div className="flex  gap-2">
          <Form.Item label="Employee Name" className="flex-1" name="name">
            <Input disabled />
          </Form.Item>
        </div>

        <div className="flex gap-2">
          <Form.Item label="Designation" className="flex-1" name="designation">
            <Input disabled />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please change the status" }]}
            className="flex-2 w-40"
          >
            <Select>
              <Option value="Approved">Approve</Option>
              <Option value="Rejected">Reject</Option>
            </Select>
          </Form.Item>

          {/* Notice Period Input */}
          <Form.Item
            label="Notice Period Days"
            name="noticePeriodDays"
            rules={[
              {
                required: !isNoticePeriodDisabled, // Required only if not disabled
                message: "Please enter notice period days",
              },
            ]}
          >
            <Input
              placeholder="Enter Days"
              type="number"
              className="rounded-lg"
              value={noticePeriodDays}
              onChange={(e) => setNoticePeriodDays(e.target.value)}
              disabled={isNoticePeriodDisabled} // Disable when status is "Rejected"
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Admin Note"
          name="adminNoteOrResolutionNote"
          rules={[{ required: true, message: "Please provide an admin note" }]}
        >
          <Input.TextArea placeholder="Enter admin note" />
        </Form.Item>

        <Form.Item>
          <Button className="bg-yellow-400" htmlType="submit" type="text">
            {isPending ? "Updating..." : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangeStatus;
