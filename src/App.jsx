import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Unauthorized from "./pages/Unauthorized";

import RouteNotFound from "./pages/RouteNotFound";
import Dashboard from "./pages/Dashboard";
import AttendanceList from "./ui/AttendanceList";
import AllUsersList from "./ui/AllUsersList";
import UserDetails from "./pages/UserDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswod from "./pages/ResetPasswod";
import TaskPage from "./pages/taskpages/TaskPage";
import NotificationPage from "./pages/NotificationsPage";
import LeavesHistory from "./pages/leavespages/LeavesHistory";
import LeavesPage from "./pages/leavespages/LeavesPages";
import AdminLeavePage from "./pages/leavespages/AdminLeavePage";
import UpdateUserForm from "./pages/UpdateUserForm";
import UserCancleLeave from "./pages/leavespages/UserCancleLeave";
import AdminCancleLeave from "./pages/leavespages/AdminCancleLeave";
import UserLeaveActivity from "./pages/leavespages/UserLeaveActivity";
import VerifyMail from "./pages/VerifyMail";
import CreateTaskForm from "./pages/taskpages/CreateTaskForm";
import TaskHistory from "./pages/taskpages/TaskHistory";
import LeaveMenu from "./pages/LeaveMenu";
import HolidayCalander from "./ui/HolidayCalander";
import EmployeesSubMenu from "./pages/Employees/EmployeesSubMenu";
import LeavesSubMenu from "./pages/Employees/LeavesSubMenu";
import ProfileSubMenu from "./pages/Employees/ProfileSubMenu";
import ManageTickets from "./ui/tickets/admin/ManageTickets";
import TicketSubMenu from "./pages/ticketpages/employee/TicketSubMenu";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000,
    },
  },
});

// const AuthenticatedAdminDashboard = withAuth(AdminDashboard, ['admin']);

// function PrivateRoute({ element }) {
//   return localStorage.getItem("token") ? (
//     element
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword/:token" element={<ResetPasswod />} />
            <Route path="/VerifyMail/:token" element={<VerifyMail />} />
            <Route
              element={
                localStorage.getItem("token") ? (
                  <AppLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route index element={<Navigate to="/home" />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/taskpage" element={<TaskPage />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/LeavesHistory" element={<LeavesHistory />} />
              <Route path="/ManageTickets" element={<ManageTickets />} />
              <Route path="/TicketSubMenu" element={<TicketSubMenu />} />
              <Route path="/LeavesPage" element={<LeavesPage />} />
              <Route path="/UserCancleLeave" element={<UserCancleLeave />} />
              <Route
                path="/UserLeaveActivity"
                element={<UserLeaveActivity />}
              />
              <Route path="/employees" element={<EmployeesSubMenu />} />
              <Route path="/employees/:userId" element={<ProfileSubMenu />} />
              <Route
                path="/employee/task/:userId"
                element={<CreateTaskForm />}
              />
              <Route
                path="/employees/update/:userId"
                element={<UpdateUserForm />}
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/AdminLeavePage" element={<LeavesSubMenu />} />
              <Route path="/LeaveMenu" element={<LeaveMenu />} />
              <Route path="*" element={<RouteNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
