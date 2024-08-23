import { LoaderIcon } from "react-hot-toast";
// import UserCard from "./UserCard"; asch
import useGetAllUsers from "../features/users/useGetAllUsers";
import CreateNewUser from "../pages/CreateNewUser";
import withAuth from "../store/withAuth";
import { useEffect, useState } from "react";
import { Avatar, Button, List, Input } from "antd";
import getUserIdRole from "../utils/getUserIdRole";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const AllUsersList = () => {
  const { id } = getUserIdRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allUsers, isPending } = useGetAllUsers(id);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const userData = users.map((item) => {
    return {
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
    <>
      <div className="h-full p-8 w-full">
        <div className="">
          <div>
            <h1 className="font-bold text-xl">All Employees List</h1>
          </div>
          <div className="flex gap-4">
            <Input
              className="p-2 my-4 flex gap-4 mb-5 border-2 rounded-lg border-blue-200 dark:border-gray-600"
              placeholder="Search users"
              onChange={handleSearch}
              value={searchQuery}
              prefix={<SearchOutlined />}
            />
            <Button
              className="bg-slate-100 dark:bg-slate-500 dark:text-slate-100 my-4 flex gap-4 mb-5 border-2 rounded-lg border-blue-200 dark:border-gray-600"
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
              <List.Item key={index} className="bg-white rounded-md mb-1">
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
                    <div>{item?.designation}</div>
                  </div>
                </div>
                <Link to={`${item?.key}`}>
                  <Button type="link" className="mr-4">
                    View Details
                  </Button>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(AllUsersList, ["admin"]);
