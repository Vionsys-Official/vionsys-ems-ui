import React, { useEffect, useState } from 'react'
import useGetAllTasks from '../../features/task/useGetAllTasks';
import { format } from 'date-fns';
import { Modal, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Input } from "antd";
const TaskHistory = () => {
    const [modalData, setModalData] = useState({ visible: false, description: '' });
    const [searchQuery, setSearchQuery] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleModalOpen = (description) => {
        setModalData({ visible: true, description });
    };

    const handleModalClose = () => {
        setModalData({ visible: false, description: '' });
    };

    const columns = [
        {
            title: 'SR no',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            hidden: true,
        },
        {
            title: 'EMP ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
        },
        {
            title: 'Employee',
            dataIndex: 'assignedTo',
            key: 'assignedTo',
            render: (_, { assignedTo }) => (
                <span>{assignedTo.firstName} {assignedTo.lastName}</span>
            ),
        },
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <>
                    <Link className='text-blue-400' onClick={() => handleModalOpen(record.description)}>{record.title}</Link>
                </>
            ),
        },
        {
            title: 'Task Assigner',
            dataIndex: 'assignedBy',
            key: 'assignedBy',
            render: (_, { assignedBy }) => (
                <span>{assignedBy.firstName} {assignedBy.lastName}</span>
            ),
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    {status === 'PENDING' && (
                        <Tag color="yellow">Pending</Tag>
                    )}
                    {status === 'INPROGRESS' && (
                        <Tag color="blue">In Progress</Tag>
                    )}
                    {status === 'COMPLETED' && (
                        <Tag color="green">Completed</Tag>
                    )}
                </>
            ),
        },
        {
            title: 'Starting Date',
            dataIndex: 'startedDate',
            key: 'startedDate',
        },
        {
            title: 'Completion Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
        }
    ];


    const { data, isPending } = useGetAllTasks();
    useEffect(() => {
        if (data) {
            setTasks(data);
        }
    }, [data])
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredTasks = data?.filter((item) => {
            return (
                item?.assignedTo?.firstName.toLowerCase()?.includes(query?.toLowerCase()) ||
                item?.assignedTo?.lastName.toLowerCase()?.includes(query?.toLowerCase()) ||
                item?.employeeId?.toLowerCase()?.includes(query?.toLowerCase())
            )
        });
        setTasks(filteredTasks);
    }

    const dataSource = tasks
        ?.map((item) => ({
            key: item._id,
            id: item._id,
            title: item.title,
            description: item.description,
            assignedBy: item.assignedBy, // Assuming assignedBy is an object with firstName and lastName
            assignedTo: item.assignedTo,
            employeeId: item.employeeId,
            deadline: format(new Date(item.deadline), 'dd-MM-yyyy'),
            status: item.status,
            startedDate: item.startedDate ? format(new Date(item.startedDate), 'dd-MM-yyyy') : 'NA',
            completedDate: item.completedDate ? format(new Date(item.completedDate), 'dd-MM-yyyy') : 'NA',
        }))
        ?.sort((a, b) => {
            // Sort by status first
            const statusOrder = {
                PENDING: 1,
                INPROGRESS: 2,
                COMPLETED: 3,
            };
            if (statusOrder[a.status] !== statusOrder[b.status]) {
                return statusOrder[a.status] - statusOrder[b.status];
            }
            // If status is the same, sort by insertion time (assuming 'deadline' is the insertion time)
            return new Date(a.deadline) - new Date(b.deadline);
        });

    return (
        <section className='p-8 w-full'>
            <div className='flex gap-4 my-4'>
                <Input
                    className="p-2"
                    placeholder="Search users by id or username"
                    onChange={handleSearch}
                    value={searchQuery}
                />
            </div>
            {isPending ? <h1>Loading....</h1> :
                <>
                    <Table columns={columns} dataSource={dataSource} />
                    <Modal open={modalData.visible} onCancel={handleModalClose} footer={null}>
                        <p>{modalData.description}</p>
                    </Modal>
                </>
            }
        </section>
    )
}

export default TaskHistory