import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from "react-hot-toast";
import { PiPhoneCallLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { Button, Card } from "antd";
import useGetAttendance from "../../features/attendance/useGetAttendance";
import useUpdateAttendance from '../../features/attendance/useUpdateAttendance';
import useCreateAttendance from '../../features/attendance/useCreateAttendance';
import useGetCurrentUser from '../../features/users/useGetCurrentUser';
import getUserIdRole from '../../utils/getUserIdRole';
import sendverifymail from '../../features/authentication/useVerifyMail';
import { isToday } from 'date-fns';
import HighlightsBDWA from './HighlightsBDWA';

const UserProfile = () => {
    const { id } = getUserIdRole();
    const { sendmail, isPending } = sendverifymail();
    const { data: employeesAttendance, isPending: tableLoading } = useGetAttendance();
    const { updateAttendance, isPending: updateLoading } = useUpdateAttendance();
    const { createAttendance, isPending: attendanceLoading } = useCreateAttendance();
    const { user: userData, isPending: userLoading } = useGetCurrentUser(id);

    const checkIsToday = (employeesAttendance) => {
        const checkIsToday = employeesAttendance?.data?.attendance.filter((obj) =>
            isToday(obj?.date)
        );
        return checkIsToday;
    };

    const [startTime, setStartTime] = useState("00:00:00");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!tableLoading) {
            const currentDateData = checkIsToday(employeesAttendance);
            if (currentDateData.length > 0) {
                // If there is login time for today but no logout time, set isActive to true
                if (!currentDateData[0]?.logoutTime) {
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            } else {
                // If there is no login time for today, set isActive to false
                setIsActive(false);
            }
        }
    }, [tableLoading, employeesAttendance]);

    useEffect(() => {
        let timer;
        if (!tableLoading && isActive) {
            timer = setInterval(() => {
                const currentDateData = checkIsToday(employeesAttendance);
                if (currentDateData.length > 0) {
                    const timeDifference = Math.abs(
                        new Date().getTime() -
                        new Date(currentDateData[0]?.loginTime)?.getTime()
                    );
                    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
                    let minutes = Math.floor(
                        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    let seconds = Math.abs(
                        Math.floor((timeDifference % (1000 * 60)) / 1000)
                    );
                    hours = hours < 10 ? "0" + hours : hours;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    const stopwatchOrTimerFormat = `${hours}:${minutes}:${seconds}`;
                    setStartTime(stopwatchOrTimerFormat);
                }
            }, 1000);
        } else {
            setStartTime("00:00:00");
        }

        return () => clearInterval(timer);
    }, [tableLoading, isActive, employeesAttendance]);

    const handleAttendanceLogin = () => {
        const time = new Date().toISOString();
        if (!checkIsToday(employeesAttendance)?.length) {
            // If there is no login time for today, proceed with login
            createAttendance({ user: id, time, timeTag: "login" });
            setIsActive(true);
        } else {
            toast.error("You are already checked in");
        }
    };

    const handleAttendanceLogout = () => {
        const time = new Date().toISOString();
        if (checkIsToday(employeesAttendance)?.length) {
            // If there is login time for today, proceed with logout
            updateAttendance({ user: id, time, timeTag: "logout" });
            setIsActive(false);
        } else {
            toast.error("You are already checked out");
        }
    };

    const handleSendVerifyEmail = (email) => {
        sendmail(email);
    };

    return (
        <>
            {
                userLoading ? (
                    <LoaderIcon />
                ) : (
                    <>
                        <div className="w-full flex bg-white rounded-md shadow-lg">
                            {/* Your JSX for user profile */}
                            {/* left side image */}
                            <div className="relative rounded-md border-2 border-blue-200 flex items-center justify-center">
                                <img src={userData?.data?.user?.profile} className="rounded-md object-cover" width={230} height={230} alt="" />
                            </div>
                            {/* right side image */}
                            <div className="w-full">
                                {/* first */}
                                <div className="p-4 flex flex-col h-full justify-center gap-2">
                                    <div className="flex gap-2 items-center">
                                        <h1 className="text-2xl font-bold text-center">{`${userData?.data?.user?.firstName} ${userData?.data?.user?.lastName}`}</h1>
                                        <h2>
                                            <span className="">
                                                {userData?.data?.user?.isVerified ? (
                                                    <MdVerified color="blue" />
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleSendVerifyEmail(userData?.data?.user?.email)
                                                        }
                                                        className="border border-blue-500 text-blue-500 px-4 rounded-md  "
                                                    >
                                                        {!isPending ? "Verify Email" : "sending mail..."}
                                                    </button>
                                                )}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <CiLocationOn />
                                            <span>{userData?.data?.user?.TempAddress}</span>
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                            <CiMail />
                                            <span>{userData?.data?.user?.email}</span>
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                            <PiPhoneCallLight />
                                            <span>+91{userData?.data?.user?.phone}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between py-4 flex-4 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#adacacba]">Designation</p>
                                            <span>{userData?.data?.user?.designation}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#adacacba]">Reporting Manager</p>
                                            <span>{userData?.data?.user?.reportingManager}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#adacacba]">Team Lead</p>
                                            <span>{userData?.data?.user?.teamLead}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#adacacba]">Employee ID</p>
                                            <span>{userData?.data?.user?.employeeId}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#adacacba]">Blood Group</p>
                                            <span>{userData?.data?.user?.bloodGroup}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 py-6 items-start">
                            {/* Highlight section */}
                            <HighlightsBDWA />
                            <Card className="col-span-1 shadow-md">
                                <div className='flex p-3 rounded-md border-2 border-blue-200 flex-col'>
                                    <h2 className="text-lg text-center mb-2">Your Attendance</h2>
                                    <h4 className="text-center text-4xl mb-2">{!tableLoading ? startTime : "00:00:00"}</h4>
                                    <div className="border bg-slate-100 rounded-md mb-4 flex-1 text-[#888] p-2 flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <span>Break Time:</span>
                                            <span>1 hour during 10AM - 7PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Target Hours:&nbsp;</span>
                                            <span>08H 15M (per day)</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 justify-center items-center">
                                        <Button
                                            type="button"
                                            className={`bg-green-400 text-white ${isActive
                                                ? "pointer-events-none opacity-50"
                                                : "hover:bg-white hover:text-green-400 hover:border-green-400"
                                                }`}
                                            onClick={handleAttendanceLogin}
                                            disabled={
                                                attendanceLoading ||
                                                employeesAttendance?.data?.attendanceForDay?.loginTime
                                            }
                                        >
                                            Check In
                                        </Button>
                                        <Button
                                            type="button"
                                            className={`bg-red-500 text-white ${!isActive
                                                ? "pointer-events-none opacity-50"
                                                : "hover:bg-white hover:text-red-500 hover:border-red-500"
                                                }`}
                                            onClick={handleAttendanceLogout}
                                            disabled={
                                                updateLoading ||
                                                employeesAttendance?.data?.attendanceForDay?.logoutTime
                                            }
                                        >
                                            Check Out
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default UserProfile;
