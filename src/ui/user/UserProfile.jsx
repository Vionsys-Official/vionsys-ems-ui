import { LoaderIcon } from "react-hot-toast";
import { PiPhoneCallLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import useGetCurrentUser from '../../features/users/useGetCurrentUser';
import getUserIdRole from '../../utils/getUserIdRole';
import HighlightsBDWA from './HighlightsBDWA';
import CheckInCheckOut from '../attendance/CheckInCheckOut';

const UserProfile = () => {
    const { id } = getUserIdRole();
    const { user: userData, isPending: userLoading } = useGetCurrentUser(id);
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
                            <CheckInCheckOut />
                        </div>
                    </>
                )
            }
        </>
    );
}

export default UserProfile;
