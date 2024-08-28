import { Button, DatePicker, Form, Input, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getUserIdRole from '../../utils/getUserIdRole';
import useCreateTask from '../../features/task/useCreateTask';

const CreateTaskForm = () => {
    const { userId } = useParams();
    const { id } = getUserIdRole();
    const { createTask, isPending } = useCreateTask();
    const navigate = useNavigate();

    // Function to disable dates before today
    const disabledDate = current => {
        // Disable dates before today
        return current && current.valueOf() < Date.now() - 24 * 60 * 60 * 1000; // Subtract 24 hours to include today
    };

    const handleFinish = (values) => {
        values.user = userId;
        values.deadline = new Date(values.deadline).toISOString();
        values.assignedBy = id;
        console.log(values)
        createTask(values, {
            onSuccess: () => {
                navigate(`/employees/${userId}`)
            }
        });
    }

    const handleCancel = () => {
        navigate(-1); // Navigate to the previous page
    }

    return (
        <section className='flex justify-center items-center px-2 py-4'>
            <Form
                name='myForm'
                layout='vertical'
                onFinish={handleFinish}
                className='relative flex flex-col border px-4 py-2 bg-white rounded-md shadow-lg'
            >
                <div className='flex justify-between items-center mb-4'>
                    <h4 className='text-center font-semibold text-2xl'>Assign Task to Employee</h4>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={handleCancel}
                        className="text-xl rounded-full flex justify-center items-center"
                    />
                </div>
                <div className='flex flex-wrap w-full gap-4'>
                    <Form.Item
                        label="Title"
                        name="title"
                        className="flex flex-col flex-1"
                        rules={[
                            { required: true, message: 'Please enter a title' }
                        ]}
                    >
                        <Input placeholder='Enter title' />
                    </Form.Item>
                    <Form.Item
                        label="Deadline"
                        name="deadline"
                        className="flex flex-col flex-1 w-full"
                        rules={[
                            { required: true, message: 'Please enter deadline for task' }
                        ]}
                    >
                        <Input type='Date' name='deadline' />
                        {/* <Space direction="vertical">
                            <DatePicker style={{ width: '100%' }} onChange={(e) => console.log((e?.$d).toISOString())} name='deadline' disabledDate={disabledDate} />
                        </Space> */}
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="Description"
                        name="description"
                        className="flex flex-col flex-1"
                        rules={[
                            { required: true, message: 'Please enter a description' }
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder='Enter description' />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        className="bg-slate-600 hover:bg-slate-500"
                        htmlType="submit"
                        loading={isPending}
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </section>
    )
}
export default CreateTaskForm;
