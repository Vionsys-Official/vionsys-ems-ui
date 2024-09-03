import React from "react";
import { Button, Form, Input, Select } from "antd";
import useUpdateResignationAdmin from "../../../features/resignation/useUpdateResignationAdmin";

const { Option } = Select;

const ChangeStatus = ({ record, isOpen, setIsOpen }) => {
  const [form] = Form.useForm();
  const { dataupdateResignation, isPainding } = useUpdateResignationAdmin();

  const handleFinish = (values) => {
    dataupdateResignation({
      resignationId: record._id,
      userId: record.user,
      status: values.status,
      note: values.adminNoteOrResolutionNote,
    });
    setIsOpen(!isOpen);
    form.resetFields();
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
          ResignationType: record.resignationType || "",
          status: record.resignationStatus || "",
          adminNoteOrResolutionNote: record.noteByAdmin || "",
        }}
        onFinish={handleFinish}
      >
        <div className="flex gap-2">
          <Form.Item label="Employee Name" className="flex-1" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Designation" className="flex-1" name="designation">
            <Input disabled />
          </Form.Item>
        </div>

        <div className="flex gap-4">
          <Form.Item
            label="Resignation Type"
            name="ResignationType"
            className="flex-1"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please Change Status" }]}
            className="flex-2 w-32"
          >
            <Select>
              <Option value="Approved">Approve</Option>
              <Option value="Rejected">Reject</Option>
            </Select>
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
            {isPainding ? "Updating..." : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangeStatus;
