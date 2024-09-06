import { LoaderIcon } from "react-hot-toast";
// import UserCard from "./UserCard"; 
import useGetAllUsers from "../features/users/useGetAllUsers";
import CreateNewUser from "../pages/CreateNewUser";
import withAuth from "../store/withAuth";
import { useEffect, useState } from "react";
import { Avatar, Button, List, Input, Modal } from "antd";
import getUserIdRole from "../utils/getUserIdRole";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import UserAttendance from "./user/UserAttendance";

const AllUsersList = () => {
  const { id } = getUserIdRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allUsers, isPending } = useGetAllUsers(id);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (allUsers && allUsers.data) {
      setUsers(allUsers.data.users || []);
    }
  }, [allUsers]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filterResults = allUsers?.data?.users.filter((item) => {
      return (
        item?.firstName?.toLowerCase().includes(query?.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(query?.toLowerCase())
      );
    });
    setUsers(filterResults);
  };

  const handleViewAttendance = (user) => {
    // console.log(user)
    setSelectedUser(user);
    setIsAttendanceModalOpen(true);
  };

  const handleCancel = () => {
    setIsAttendanceModalOpen(false);
    setSelectedUser(null);
  };


  const userData = users.map((item) => {
    return {
      uid:item._id,
      key: item._id,
      title: (
        <Link to={`${item?._id}`}>{`${item.firstName} ${item?.lastName}`}</Link>
      ),
      designation: item?.designation,
      profile: item?.profile,
    };
  });



  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="py-5 mb-8">
      <div className="h-full p-5 w-full">
        <div className="">
          <div>
            <h1 className="font-bold text-black dark:text-white  text-xl">All Employees List</h1>
          </div>
          <div className="flex gap-4">
            <Input
              className="p-2 my-4 flex gap-4 mb-5 border-2 rounded-lg dark:text-white border-blue-200 dark:border-white dark:border dark:bg-gray-500"
              placeholder="Search users"
              onChange={handleSearch}
              value={searchQuery}
              prefix={<SearchOutlined />}
            />
            <Button
              className="bg-slate-100 dark:bg-slate-500 text-center dark:text-slate-100 my-4 flex gap-4 mb-5 border-2 rounded-lg border-blue-200 dark:border-white dark:border"
              size="large"
              onClick={showModal}
            >
              Create New User
            </Button>
          </div>
        </div>
        <CreateNewUser
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <div className="h-[90%] overflow-scroll">
          {isPending && <LoaderIcon />}
          <List
            itemLayout="horizontal"
            dataSource={userData}
            renderItem={(item, index) => (
              <List.Item key={index} className="bg-white dark:text-white dark:bg-slate-500 rounded-md mb-1">
                <div className="flex items-center gap-4 px-6">
                  <Avatar
                    size={50}
                    src={`${
                      item.profile ||
                      "../assets/illustration-businessman_53876-5856.jpg"
                    }`}
                  />
                  <div>
                    <div className="text-base font-semibold">{item.title}</div>
                    <div className="dark:text-gray-200">{item?.designation}</div>
                  </div>
                </div>
                <div>
                  <Link to={`${item?.key}`}>
                    <Button
                      type="link"
                      className="mr-4 border dark:text-white border-slate-300"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    type="link"
                    className="mr-4 border dark:text-white border-slate-300"
                    onClick={() => handleViewAttendance(item)}
                  >
                    Attendance
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
        <Modal
          title="User Attendance"
          open={isAttendanceModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={1000}
        >
          {selectedUser && <UserAttendance user={selectedUser} />}
        </Modal>
      </div>
    </section>
  );
};

export default withAuth(AllUsersList, ["admin"]);
