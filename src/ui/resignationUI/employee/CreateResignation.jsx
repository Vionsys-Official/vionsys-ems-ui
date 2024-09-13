import { Button, Form, Input, Modal } from "antd";
import useCreateResignation from "../../../features/resignation/useCreateResignation";
import getUserIdRole from "../../../utils/getUserIdRole";

const { TextArea } = Input;

const CreateResignation = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const { id: userId } = getUserIdRole();
  const { createResignation, isLoading } = useCreateResignation(); // Using the custom hook
  const defaultNoticePeriod = 60; // Default value set to 60 days

  const handleSubmit = (resignationData) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const data = {
      ...resignationData,
      user: userId,
      defaultNoticePeriod, // Ensure notice period is always set to 60
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

          {/* Notice Period Input */}
          <Form.Item
            label="Notice Period Days"
            name="defaultNoticePeriod"
            initialValue={defaultNoticePeriod} // Set initial value to 60
          >
            <Input
              type="number"
              value={defaultNoticePeriod} // Keep the value as 60
              className="rounded-lg"
              disabled // Make the field non-editable
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
