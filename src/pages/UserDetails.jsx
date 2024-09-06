import { useNavigate, useParams } from "react-router-dom";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { HiTrash, HiPencil } from "react-icons/hi";
import { LoaderIcon } from "react-hot-toast";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import { useDeleteUser } from "../features/users/useDeleteUser";
import ExcelForm from "../ui/ExcelForm";
import { BiTask } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlineBloodtype } from "react-icons/md";

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
    <div className="p-2 w-full rounded-xl flex justify-center items-center  dark:text-slate-600 overflow-hidden ">
      <div className="relative rounded-xl grid grid-cols-1 md:grid-cols-5 px-4 gap-6 md:pt-14 pt-20 bg-white dark:bg-slate-200 py-8 w-full justify-around items-start ">
        <div className="flex flex-col col-span-2 gap-2 shadow-xl bg-slate-100 dark:bg-slate-400  p-6 rounded-lg border  ">
        <div className="flex flex-col justify-center items-center">
         <div className="rounded-full border-2 border-blue-200">
         <img
            className="w-40 h-40 rounded-full object-cover shadow-md mx-auto"
            src={
              userData?.profile ||
              "../assets/illustration-businessman_53876-5856.jpg"
            }
            alt="profile"
          />
         </div>
          <p className="text-xl mt-4 font-bold dark:text-black text-center">
            {`${userData?.firstName} ${userData?.lastName}`}
          </p>
          <p className="text-lg text-center dark:text-black">
            {userData?.employeeId ? userData.employeeId : "N/A"}
          </p>
          <p className="text-lg text-center dark:text-black">
          {`${userData?.designation}`}
          </p>
          </div>
          <div className="flex bg-white dark:bg-slate-200  flex-col gap-2 justify-start items-start  py-2 rounded-lg pl-4  border">
          <p className="text-xl  font-bold text-center  dark:text-black">
           Basic Information
          </p>
          <p className="text-lg  items-center flex gap-1">
          <span>
          <MdOutlineMailOutline className="w-5 h-5 text-black dark:text-black font-bold" />
          </span>
            <span className="text-slate-700 dark:text-black">{`${userData?.email}`}</span>
          </p>
          <p className="text-lg  items-center flex gap-1">
          <span>
          <MdOutlinePhoneInTalk className="w-5 h-5 dark:text-black"/>
          </span>
            <span className="text-slate-700 dark:text-black">{userData?.phone ? userData.phone : "N/A"}</span>
          </p>
          <p className="text-lg flex items-center gap-2">
          <span>
          <SlCalender className="w-4 h-4 dark:text-black font-extrabold" />
          </span>
            <span className="text-slate-700 dark:text-black">{userData?.doj ? new Date(userData.doj).toLocaleDateString() : "N/A"}</span>
          </p>
          <p className="text-lg  flex items-center gap-1">
          <span>
          <MdOutlineBloodtype className="w-5 h-5 pl-0 dark:text-black" />

          </span>
            <span className="text-slate-700 dark:text-black">{userData?.bloodGroup ? userData.bloodGroup : 'N/A'}</span>
          </p>
          
          </div>
          <div>
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
                  Do you really want to delete these records? This process cannot be
                  undone.
                </h2>
              </div>
            </Modal>
            <ExcelForm
              isModalOpen={excelModal}
              setIsModalOpen={setexcelModal}
              userId={userId}
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Tooltip placement="top" title="Assign Task">
              <Button
                onClick={() => navigate(`/employee/task/${userId}`)}
                className="flex justify-center items-center gap-2 text-yellow-800"
              >
                <BiTask />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Get Attendance Excel">
              <Button
                type="default"
                className="text-[#217346]"
                onClick={() => setexcelModal(true)}
              >
                <RiFileExcel2Line />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Delete Employee">
              <Button className="text-red-500" onClick={showModal}>
                <HiTrash />
              </Button>
            </Tooltip>
            <Tooltip placement="topRight" title="Update Employee">
              <Button
                className="text-blue-400"
                onClick={() => navigate(`/employees/update/${userId}`)}
              >
                <HiPencil />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="relative flex flex-col  gap-4  col-span-3 h-full ">
        <div className="flex flex-col gap-3 border shadow-lg p-4 dark:bg-slate-400 rounded-lg h-full">
         <p className="text-xl font-bold flex justify-start items-start dark:text-black py-2 px-4">
          Personal Information
          </p>
          <div className="w-full flex px-4 ">
        <div className="flex flex-col gap-3 pb-4 w-full">
        <p className="text-lg flex ">
            <span className="block w-1/2 text-black font-semibold dark:text-black">
              Personal Email:
            </span>
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
            {userData?.personalEmail ? userData.personalEmail : "N/A"}
          </p>
          </p>
          <p className="text-lg flex">
            <span className="block w-1/2 font-semibold text-black dark:text-black">
              Contact No:
            </span>
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
            {userData?.emergencyPhone ? userData.emergencyPhone : "N/A"}
          </p>
          </p>
          <p className="text-lg flex">
            <span className="block w-1/2 font-semibold text-black dark:text-black">
              Date of Birth:
            </span>
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
          {userData?.dob ? new Date(userData.dob).toLocaleDateString() : "N/A"}
          </p>
          </p>
          <p className="text-lg flex">
            <span className="text-black w-1/2 dark:text-black font-semibold">Gender :</span>
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
          {userData?.gender ? userData.gender : "N/A"}
          </p>
          </p>
          <p className="text-lg flex">
            <span className="block w-1/2 font-semibold text-black dark:text-black">
              Permanent Address:
            </span>
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
          {userData?.PerAddress ? userData.PerAddress : "N/A"}
          </p>
          </p>    
          <p className="text-lg flex">
            <span className="block w-1/2 font-semibold text-black dark:text-black">
              Current Address:
            </span>  
            <p className="text-lg w-1/2 text-gray-700 dark:text-black">
          {userData?.TempAddress ? userData.TempAddress : "N/A"} 
          </p>          
          </p>
          </div>
          {/* <div className="w-1/2 flex flex-col gap-3">
          <p className="text-lg  text-gray-700 dark:text-black">
            {userData?.personalEmail ? userData.personalEmail : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
            {userData?.phone ? userData.phone : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
          {userData?.dob ? new Date(userData.dob).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
          {userData?.gender ? userData.gender : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
          {userData?.PerAddress ? userData.PerAddress : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
          {userData?.TempAddress ? userData.TempAddress : "N/A"} 
          </p>
          </div> */}
          </div>
        </div>


          <div className="flex flex-row  py-5 justify-between items-center px-8  shadow-lg border rounded-lg dark:bg-slate-400 
           gap-8 h-full">
          <p className="text-lg text-gray-700 dark:text-black">
            <span className="block text-black font-semibold dark:text-black">
              Reporting Manager:
            </span>
            {userData?.reportingManager ? userData.reportingManager : "N/A"}
          </p>
          <p className="text-lg text-gray-700 dark:text-black">
            <span className="block text-black font-semibold dark:text-black">
              Team Lead:
            </span>
            {userData?.teamLead ? userData.teamLead : "N/A"}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
