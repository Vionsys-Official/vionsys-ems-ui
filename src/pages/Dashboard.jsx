import { useEffect, useState } from "react";
import withAuth from "../store/withAuth";
import askUserForNotificationPermission from "../utils/askUserForNotificationPermission";
import getUserIdRole from "../utils/getUserIdRole";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import useGetNotificationToken from "../features/notification/useGetNotificationToken";

const AuthenticatedAdminDashboard = withAuth(AdminDashboard, ["admin"]);

const Dashboard = () => {
  const { sendNotificationToken, error } = useGetNotificationToken();
  const { role } = getUserIdRole();

  useEffect(() => {
    const fetchNotificationToken = async () =>
      await askUserForNotificationPermission(sendNotificationToken);
    fetchNotificationToken();
  }, []);

  return (
    <>
      {role === "admin" ? <AuthenticatedAdminDashboard /> : <UserDashboard />}
    </>
  );
};

export default Dashboard;
