import { Form, Input, Modal } from 'antd';
import TextArea from 'rc-textarea';
import React from 'react'
import useCreateNotification from '../features/notification/useCreateNotification';

const NotificationForm = ({showModal,isShowModal}) => {
  const { mutate } = useCreateNotification();
  const [form] = Form.useForm(); // Ant Design form instance
  
  const initialValues = {
    title: '',
    description: '',
  };

  const handleModal = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      mutate(values); // Perform mutation with validated values
      form.resetFields(); // Reset form fields after successful mutation
      showModal(false); // Close modal
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  };

  return (
    <Modal
      title="Create Notification"
      open={isShowModal}
      okType="default"
      width={400}
      onOk={handleModal}
      onCancel={() => showModal(false)}
    >
      <Form
        form={form} // Pass Ant Design form instance to the Form component
        name="wrap"
        labelCol={{
          flex: '110px',
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 400,
        }}
        initialValues={initialValues} // Set initial form values
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter notification title',
            },
          ]}
        >
          <Input placeholder="Notification Title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter notification description',
            },
          ]}
        >
          <TextArea className="w-full border rounded-md p-2 outline-none hover:border-blue-400" placeholder="Notification Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NotificationForm;
