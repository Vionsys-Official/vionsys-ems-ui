import getUserIdRole from "../../utils/getUserIdRole";
import useGetUserLeaveHistory from "../../features/leaves/useGetUserLeaveHistory";
import { FaRegClipboard } from "react-icons/fa";
import { BsCalendar4Event } from "react-icons/bs";
import { ImStarEmpty } from "react-icons/im";
import { PiBagLight } from "react-icons/pi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GoHourglass, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { MdOutlineSick } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCalendarTimes } from "react-icons/fa";

const UserLeaveActivity = () => {
  const { id } = getUserIdRole();
  const { data } = useGetUserLeaveHistory(id);
  const userleavecount = data?.userAllLeaves[0]?.leavescounts;
  return (
    <main>
      {userleavecount &&
        userleavecount.map((leavecount, index) => (
          <section key={index} className="p-5 bg-slate-200 h-[100vh]">
            <div className="w-full flex p-2">
              <h2 className="text-xl font-bold text-[#374151]">User Leave Balance</h2>
            </div>
            {/* available_leave_sections --- start*/}

            <section className="available_leave_section grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full p-5">
              <div className="md:border-r w-full ">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#9AEFCA]"><FaRegClipboard size={35} /></span>
                  <div className="p-2 border rounded-md">
                    <p className="min-w-[5rem] text-black opacity-70 text-xl">Available Leaves</p>
                    <div className="text-4xl">
                   
                      {leavecount?.floaterleave +
                        leavecount?.privilageleave +
                        leavecount?.sickleave +
                        leavecount?.casualleave}
                      <div className="border rounded-md text-xl bg-slate-100">Total 21</div>
                    </div>
                    
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] text-center items-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FBC950]"><BsCalendar4Event size={35} /></span>
                  <div className="p-2 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Floater Leaves
                    </p>
                    <div className="text-4xl">{leavecount?.floaterleave}
                    <div className="border rounded-md text-xl bg-slate-100">Total 1</div>
                    </div>
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#D1B5F0]"><ImStarEmpty size={35} /></span>
                  <div className="p-2 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Privilege Leaves</p>
                    <div className="text-4xl">{leavecount?.privilageleave}
                    <div className="border rounded-md text-xl bg-slate-100">Total 10</div>
                    </div>
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#C9EF9A]"><MdOutlineSick size={35} /></span>
                  <div className="p-2 px-8 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Sick Leaves</p>

                       <div className="text-4xl">{leavecount?.sickleave}</div>
                       <div className="border rounded-md text-xl bg-slate-100">Total 5</div>
                    
                  </div>
                </span>
              </div>

              <div className="md:border-r w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#AFBF9A]"><PiBagLight size={35} /></span>
                  <div className="p-2 px-3 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Casual Leaves</p>
                    <p className="text-4xl">{leavecount?.casualleave}</p>
                    <div className="border rounded-md text-xl bg-slate-100">Total 5</div>
                  </div>
                </span>
              </div>

              <div className=" w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#F5B8CF]"><LiaRupeeSignSolid size={35} /></span>
                  <div className="p-2 px-4 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Unpaid Leaves</p>
                    <p className="text-4xl">{leavecount?.unpaidleave}</p>
                    
                  </div>
                </span>
              </div>
            </section>
            {/* available_leave_sections --- ends*/}

            {/* user leave activity --- start*/}
            <div className="w-full flex p-2">
              <h2 className="text-xl font-bold text-[#374151]">User Leave Activity</h2>
            </div>

            <section className="available_leave_section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full  p-5">
              <div className=" ">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#a3e635]"><FaRegClipboard size={35} /></span>
                  <div className="p-5">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Total Leaves</p>
                    <p className="text-4xl">{leavecount?.totalLeaves}</p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] text-center items-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#d946ef]"><GoHourglass size={35} /></span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Pending Leaves</p>
                    <p className="text-4xl">{leavecount?.pendingLeaves}</p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#14b8a6]"><GoThumbsup size={35} /></span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Approved Leaves</p>
                    <p className="text-4xl">{leavecount?.approvedLeaves}</p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FF4C4C]"><GoThumbsdown size={35} /></span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Rejected Leaves</p>
                    <p className="text-4xl">{leavecount?.rejectedLeaves}</p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-2 h-[10rem] items-center text-center bg-white rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FFA500]"><MdOutlineCancel size={35} /></span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Cancelled Leaves</p>
                    <p className="text-4xl">{leavecount?.cancelledLeaves}</p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-2 h-[10rem] items-center text-center bg-white">
                  <span className="rounded-full p-3 bg-[#BDB76B]"><FaRegCalendarTimes size={35} /></span>
                  <div className="p-4">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">Expired Leaves</p>
                    <p className="text-4xl">{leavecount?.expiredLeaves}</p>
                  </div>
                </span>
              </div>
            </section>
          </section>
        ))}
    </main>
  );
};

export default UserLeaveActivity;
