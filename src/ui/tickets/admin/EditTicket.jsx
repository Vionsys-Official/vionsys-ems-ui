import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import useUpdateTicketById from '../../../features/ticket/useUpdateTicketById';

const { Option } = Select;

const EditTicket = ({ record, isOpen, setIsOpen }) => {
    const [form] = Form.useForm();
    const { updateTicket, isUpdatePending } = useUpdateTicketById();
    const handleFinish = (values) => {
        updateTicket({
            ...values,
            id: record.ticketId
        }, {
        })
        setIsOpen(!isOpen);
        form.resetFields();
    };
    return (
        <>
            <h3 className='mt-2 mb-4 text-3xl font-semibold text-yellow-500'>Update Ticket</h3>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: record.name,
                    designation: record.designation,
                    ticketType: record.ticketType,
                    description: record.description,
                    priority: record.priority,
                    ticketRaiser: record.ticketRaiser,
                    ticketAssignedTo: record.ticketAssignedTo,
                    status: record.status,
                    adminNoteOrResolutionNote: record.adminNoteOrResolutionNote,
                }}
                onFinish={handleFinish}
            >

                <div className='flex gap-2'>
                    <Form.Item label="Employee Name" className='flex-1' name="name">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Designation" className='flex-1' name="designation">
                        <Input disabled />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea disabled />
                    </Form.Item>
                </div>

                <div className='flex gap-4'>
                    <Form.Item label="Ticket Type" name="ticketType" className='flex-1'>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Priority" name="priority" className='flex-1'>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Status" name="status" className='flex-2 w-32'>
                        <Select>
                            <Option value="OPEN">OPEN</Option>
                            <Option value="CLOSED">CLOSED</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Admin Note or Resolution Note"
                    name="adminNoteOrResolutionNote"
                    rules={[{ required: true, message: 'Please provide an admin note or resolution note.' }]}
                >
                    <Input.TextArea placeholder="Enter admin note or resolution note here" />
                </Form.Item>

                <Form.Item>
                    <Button className='bg-yellow-400' htmlType='submit' type='text' >
                        {
                            isUpdatePending ? 'Updating...' : 'Update'
                        }
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditTicket;
