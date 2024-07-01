import { Link, useNavigate, useParams } from "react-router-dom";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { HiTrash, HiPencil } from "react-icons/hi";
import { LoaderIcon } from "react-hot-toast";
import { Button, Modal, Popover } from "antd";
import { useId, useState } from "react";
import { useDeleteUser } from "../features/users/useDeleteUser";
import ExcelForm from "../ui/ExcelForm";
import { BiTask } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { Tooltip } from "antd";


const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, isPending } = useGetCurrentUser(userId);
  const userData = user?.data?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excelModal, setexcelModal] = useState(false);
  const { deleteUser, isPending: deleteLoading } = useDeleteUser();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteUser(userId);
    navigate("/employees");
  };

  return (
    <div className="p-4 flex justify-center items-center dark:bg-slate-400 dark:text-slate-600">
      {isPending && <LoaderIcon />}
      <Modal
        title="Delete User"
        open={isModalOpen}
        footer={
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              className="bg-blue-400 text-slate-50"
              disabled={deleteLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-4 justify-center items-center p-3">
          <HiTrash className="text-red-400" size={40} />
          <h2 className="text-lg">
            {" "}
            Do you really want to delete these records? This process cannot be
            undone.{" "}
          </h2>
        </div>
      </Modal>
      <ExcelForm
        isModalOpen={excelModal}
        setIsModalOpen={setexcelModal}
        userId={userId}
      />
      <div className="relative grid grid-cols-1 px-4 md:pt-10  pt-20 gap-6 bg-slate-50 dark:bg-slate-400 py-8 w-full justify-around items-center">
        <div className="absolute top-4 right-4 flex gap-2">

          <Tooltip placement="top" title="Assign Task"><Button onClick={() => navigate(`/employee/task/${userId}`)} className="flex justify-center items-center gap-2 text-yellow-800"><BiTask /></Button></Tooltip>
          <Tooltip placement="top" title="Get Attendance Excel">
            <Button type="default" className="text-[#217346]" onClick={() => setexcelModal(true)}>
              <RiFileExcel2Line />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Delete Employee">
            <Button className="text-red-500" onClick={showModal}>
              <HiTrash />
            </Button>
          </Tooltip>
          <Tooltip placement="topRight" title="Update Employee">
            <Button className="text-blue-400" onClick={() => navigate(`/employees/update/${userId}`)}>
              <HiPencil />
            </Button>
          </Tooltip>

        </div>
        <div className="flex justify-center items-center flex-col">
          <img
            className="w-36 h-36 rounded-md object-cover shadow-md"
            src={
              userData?.profile ||
              "../assets/illustration-businessman_53876-5856.jpg"
            }
            alt="profile"
          />
          <p className="text-xl mt-4">
            {" "}
            {`${userData?.firstName} ${userData?.lastName}`}
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-x-10 gap-y-4 md:pt-10 pt-6">
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Office Email :{" "}
            </span>
            {`${userData?.email}`}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Personal Email :{" "}
            </span>
            {`${userData?.personalEmail}`}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Employee Id :{" "}
            </span>
            {`${userData?.employeeId}`}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Designation :
            </span>{" "}
            {`${userData?.designation} `}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Reporting Manager :
            </span>{" "}
            {userData?.reportingManager ? userData.reportingManager : "N/A"}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Team Lead :{" "}
            </span>
            {userData?.teamLead ? userData.teamLead : "N/A"}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Gender :{" "}
            </span>
            {userData?.gender ? userData.gender : "N/A"}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Date of Birth :{" "}
            </span>
            {userData?.dob
              ? new Date(userData.dob).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Temporary Address :{" "}
            </span>

            {userData?.TempAddress ? userData.TempAddress : 'N/A'}

          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Permanent Address :{" "}
            </span>

            {userData?.PerAddress ? userData.PerAddress : 'N/A'}

          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Contact Number :{" "}
            </span>

            {userData?.phone ? userData.phone : 'N/A'}

          </p>
          <p className="text-lg">
            <span className="text-slate-400 block dark:text-white">
              Blood Group :{" "}
            </span>

            {userData?.bloodGroup ? userData.bloodGroup : 'N/A'}

          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
