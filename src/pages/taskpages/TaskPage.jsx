import { Modal, Spin, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { LuListTodo } from "react-icons/lu";
import { IoCheckmarkDone } from "react-icons/io5";
import useGetTasksFromUserId from '../../features/task/useGetTasksFromUserId';
import { format } from 'date-fns';
import useStartTaskUpdate from '../../features/task/useStartTaskUpdate';
import useCompleteTask from '../../features/task/useCompleteTask';
import { Link } from 'react-router-dom';

const TaskPage = () => {
  const { startTask, isSubmitting } = useStartTaskUpdate();
  const { completeTask, isCompleted } = useCompleteTask();
  const [modalData, setModalData] = useState({ visible: false, description: '' });

  const handleStartTask = (id) => {
    startTask(id);
  };

  const handleCompleteTask = (id) => {
    completeTask(id);
  };

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
      title: 'Assigned By',
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
      title: 'Started Date',
      dataIndex: 'startedDate',
      key: 'startedDate',
    },
    {
      title: 'Completed Date',
      dataIndex: 'completedDate',
      key: 'completedDate',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, { status, id }) => (
        <div className='flex gap-4 flex-1'>
          {/* Start button */}
          <span className={`flex justify-center items-center gap-1 border px-2 rounded-md bg-blue-400 text-white cursor-pointer hover:bg-white hover:text-blue-400 hover:border-blue-400 py-1 ${status === 'INPROGRESS' || status === 'COMPLETED' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`} onClick={() => handleStartTask(id)}>
            {!isSubmitting ? <LuListTodo size={20} /> : <Spin />}
          </span>
          {/* Complete button */}
          <span className={`flex justify-center items-center gap-1 border px-2 rounded-md bg-green-400 text-white cursor-pointer hover:bg-white hover:text-green-400 hover:border-green-400 py-1 ${status === 'PENDING' || status === 'COMPLETED' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`} onClick={() => handleCompleteTask(id)}>
            {!isCompleted ? <IoCheckmarkDone size={20} /> : <Spin />}
          </span>
        </div>
      ),
    },
  ];


  const { data, isPending } = useGetTasksFromUserId();
  const dataSource = data
    ?.map((item) => ({
      key: item._id,
      id: item._id,
      title: item.title,
      description: item.description,
      assignedBy: item.assignedBy, // Assuming assignedBy is an object with firstName and lastName
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
    <>
      {isPending ? <h1>Loading....</h1> :
        <>
          <Table columns={columns} dataSource={dataSource} />
          <Modal open={modalData.visible} onCancel={handleModalClose} footer={null}>
            <p>{modalData.description}</p>
          </Modal>
        </>
      }
    </>
  );
}

export default TaskPage;
