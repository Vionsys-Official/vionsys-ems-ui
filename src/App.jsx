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
import AllUsersList from "./ui/AllUsersList";
import AttendanceList from "./ui/AttendanceList";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswod from "./pages/ResetPasswod";
import TaskPage from "./pages/taskpages/TaskPage";
import NotificationPage from "./pages/NotificationsPage";
import LeavesHistory from "./pages/leavespages/LeavesHistory";
import UpdateUserForm from "./pages/UpdateUserForm";
import UserCancleLeave from "./pages/leavespages/UserCancleLeave";
import UserLeaveActivity from "./pages/leavespages/UserLeaveActivity";
import VerifyMail from "./pages/VerifyMail";
import CreateTaskForm from "./pages/taskpages/CreateTaskForm";
import LeaveMenu from "./pages/LeaveMenu";
import ProfileSubMenu from "./pages/Employees/ProfileSubMenu";
import ManageTickets from "./ui/tickets/admin/ManageTickets";
import ResignationSubMenu from "./pages/Resignations/employee/ResignationSubMenu";
import ManageResignation from "./ui/resignationUI/admin/ManageResignation";
import EmpListLayout from "./pages/Employees/EmpListLayout";

import TaskHistory from '../src/pages/taskpages/TaskHistory';
import HolidayCalander from '../src/ui/HolidayCalander';
import EmpLeavesLayout from "./pages/Employees/EmpLeavesLayout";

import AdminLeavePage from "../src/pages/leavespages/AdminLeavePage";
import EmpOpenTickets from "./ui/tickets/employee/EmpOpenTickets";
import EmpClosedTickets from "./ui/tickets/employee/EmpClosedTickets";
import AdminCancleLeave from "../src/pages/leavespages/AdminCancleLeave";
import LeavesPages from "./pages/leavespages/LeavesPages";
import EmpLeaveLayout from "./ui/leavesUI/EmpLeaveLayout";
import RaiseTicket from "./ui/tickets/employee/RaiseTicket";
import TicketMenuLayout from "./pages/ticketpages/employee/TicketMenuLayout";
import ResignationMenuLayout from "./ui/resignationUI/employee/ResignationMenuLayout";
import CreateResignation from "./ui/resignationUI/employee/CreateResignation";
import CheckRStatus from "./ui/resignationUI/employee/CheckRStatus";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000,
    },
  },
});
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
              <Route
                path="/UserLeaveActivity"
                element={<UserLeaveActivity />}
              />
              {/* Admin Routes starts */}
              <Route
                element={
                  localStorage.getItem('token') ? (
                    <EmpListLayout />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              >
                <Route index element={<Navigate to={"/employees"} />} />
                <Route path="/employees" element={<AllUsersList />} />
                <Route path="/attendanceList" element={<AttendanceList />} />
                <Route path="/employeesTasks" element={<TaskHistory />} />
                <Route path="/holidayCalendar" element={<HolidayCalander />} />
              </Route>

              <Route
                element={
                  localStorage.getItem('token') ? (
                    <EmpLeavesLayout />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              >
                <Route index element={<Navigate to={"/empLeaves"} />} />
                <Route path="/empLeaves" element={<AdminLeavePage />} />
                <Route path="/empCanceledLeaves" element={<AdminCancleLeave />} />
              </Route>


              <Route path="/employees/:userId" element={<ProfileSubMenu />} />
              <Route path="/ManageTickets" element={<ManageTickets />} />
              <Route path="/ManageResignation" element={<ManageResignation />} />
              {/* Admin Routes ends */}


              {/* Employee Leave section starts */}
              <Route
                element={
                  localStorage.getItem('token') ?
                    (
                      <EmpLeaveLayout />
                    ) :
                    (
                      <Navigate to="/login" replace />
                    )
                }
              >

                <Route index element={<Navigate to="/LeaveMenu" />} />
                <Route path="/LeaveMenu" element={<LeavesPages />} />
                <Route path="/cancelledLeaveList" element={<UserCancleLeave />} />
                <Route path="/leaveActivities" element={<UserLeaveActivity />} />
                <Route path="/leaveHistory" element={<LeavesHistory />} />
              </Route>
              {/*  Employee Leave section ends */}

              {/* ticket menu starts */}
              <Route
                element={
                  localStorage.getItem('token') ? (
                    <TicketMenuLayout />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              >
                <Route index element={<Navigate to="/TicketSubMenu" />} />
                <Route path="/TicketSubMenu" element={<RaiseTicket />} />
                <Route path="/empOpenTickets" element={<EmpOpenTickets />} />
                <Route path="/empClosedTickets" element={<EmpClosedTickets />} />
              </Route>
              {/* ticket menu ends */}


              {/* Resignation route starts*/}
              <Route
                element={
                  localStorage.getItem('token') ? (
                    <ResignationMenuLayout />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              >
                <Route index element={<Navigate to="/ResignationSubMenu" />} />
                <Route path="/ResignationSubMenu" element={<CreateResignation />} />
                <Route path="/resignationStatus" element={<CheckRStatus />} />
              </Route>
              {/* Resignation route ends */}


              <Route
                path="/employee/task/:userId"
                element={<CreateTaskForm />}
              />
              <Route
                path="/employees/update/:userId"
                element={<UpdateUserForm />}
              />
              <Route path="/unauthorized" element={<Unauthorized />} />




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
      </QueryClientProvider >
    </>
  );
}

export default App;
