import withAuth from "../store/withAuth";
import getUserIdRole from "../utils/getUserIdRole";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const AuthenticatedAdminDashboard = withAuth(AdminDashboard, ["admin"]);

const Dashboard = () => {
  const {role} = getUserIdRole();

  return (
    <>
      {role === "admin" ? <AuthenticatedAdminDashboard /> : <UserDashboard />}
    </>
  );
};

export default Dashboard;
