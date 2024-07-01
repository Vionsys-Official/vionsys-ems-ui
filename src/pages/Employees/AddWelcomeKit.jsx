import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Space } from 'antd';
import { HiXCircle } from 'react-icons/hi';
import useGetCurrentUser from '../../features/users/useGetCurrentUser';
import getUserIdRole from '../../utils/getUserIdRole';
import { useParams } from "react-router";
import useAddKit from '../../features/joiningKit/useAddKit';

const AddWelcomeKit = ({ isModalOpen, setIsModalOpen }) => {
    const { id } = getUserIdRole();
    const { user, isPending } = useGetCurrentUser(id);
    const { addKit, addKitPending } = useAddKit();
    const name = `${user?.data?.user?.firstName} ${user?.data?.user?.lastName}`;
    const { userId } = useParams();
    const [form] = Form.useForm(); // Create a form instance
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        values.user = userId;
        values.assignBy = name;
        console.log(values);
        addKit(values);
        handleCancel();
    };

    return (
        <div>
            {!isPending && (
                <Modal
                    width={400}
                    open={isModalOpen} // Changed 'open' to 'visible'
                    closeIcon={<HiXCircle size={25} onClick={handleCancel} />}
                    footer={false}
                >
                    <Form
                        name="myForm"
                        layout="vertical"
                        onFinish={onFinish}
                        form={form} // Pass the form instance to the Form component
                    >
                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Name"
                                name="accessoryName"
                                className="flex-1"
                                rules={[
                                    { required: true, message: 'Please enter the accessory name' },
                                ]}
                            >
                                <Input placeholder="Accessory Name" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Company Name"
                                name="accessoryCompany"
                                className="flex-1"
                            >
                                <Input placeholder="Accessory Company Name" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Accessory Id"
                                name="accessoryId"
                                className="flex-1"
                            >
                                <Input placeholder="Accessory Id if available" />
                            </Form.Item>
                        </div>

                        <div className="flex flex-wrap gap-x-4">
                            <Form.Item
                                label="Assigned Date"
                                name="assignDate"
                                className="flex-1"
                                rules={[
                                    { required: true, message: 'Please select the assigned date' },
                                ]}
                            >
                                <Input type='Date' />
                            </Form.Item>

                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                className="bg-blue-600"
                                htmlType="submit"
                            >
                                Provide Kit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default AddWelcomeKit;
