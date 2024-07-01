import { Card } from "antd";
// import useDeleteUser from "../features/users/useDeleteUser";

const { Meta } = Card;

const UserCard = ({ item }) => {
  // const { deleteUser, isPending } = useDeleteUser();

  // const handleDelete = (id) => {
  //   deleteUser(id);
  // }
  return (
    <Card>
      <Meta title={`${item.firstName} ${item.lastName}`} />
      <div>
        <div className="">Email: {item?.email}</div>
        <div className="">EmployeeId: {item?.employeeId}</div>
        <div className="">Reporting Manager : {item?.reportingManager}</div>
        <div className="">Team Lead : {item?.teamLead}</div>
        <div className="">excel download : "download"</div>
     
      </div>
    </Card>
  );
};

export default UserCard;
