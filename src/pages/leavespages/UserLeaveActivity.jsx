import { Modal, Form, InputNumber, Button, Row, Col } from "antd";
import { useState } from "react";
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
import useUpdateLeaveCount from "../../features/leaves/useUpdateLeaveCount";
import toast from "react-hot-toast";

const UserLeaveActivity = ({ user }) => {
  const { id } = getUserIdRole();
  const { role } = getUserIdRole();
  const userID = user || id;
  const { data } = useGetUserLeaveHistory(userID);

  const userleavecount = data?.userAllLeaves[0]?.leavescounts;
  // console.log(userleavecount)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedLeaveCount, setEditedLeaveCount] = useState(userleavecount);
  const { updateLeaveCount, isPending } = useUpdateLeaveCount(); // Use the hook

  const openEditModal = () => setIsEditModalOpen(true);
  const handleEditModalCancel = () => {
    setIsEditModalOpen(false);
    setEditedLeaveCount(null);
  };

  // Handle leave count changes in the form
  const handleLeaveCountChange = (field, value) => {
    setEditedLeaveCount({
      ...editedLeaveCount,
      [field]: value,
    });
  };

  // Submit updated leave counts
  const handleLeaveUpdate = () => {
    // Check if any values have changed
    if (!editedLeaveCount) {
      toast.error("Please enter valid leave counts."); // Show error toast
      return;
    }
    

    const leaveData = {
      floaterleave: editedLeaveCount.floaterleave,
      privilageleave: editedLeaveCount.privilageleave,
      sickleave: editedLeaveCount.sickleave,
      casualleave: editedLeaveCount.casualleave,
      unpaidleave: editedLeaveCount.unpaidleave,
      approvedLeaves: editedLeaveCount.approvedLeaves,
    };

    console.log("Leave data to update:", leaveData); // Log here to check values

    updateLeaveCount({ userId: userID, leaveData })
      .then((data) => {
        console.log("Response data:", data); // Log response data
      })
      .catch((error) => {
        console.error("Error updating leave count:", error); // Log any error
      });

    setIsEditModalOpen(false);
  };

  return (
    <main>
      {userleavecount &&
        userleavecount.map((leavecount, index) => (
          <section
            key={index}
            className="p-5 dark:text-white bg-slate-200 dark:bg-slate-600 mb-8"
          >
            <div className="w-full flex justify-between p-2">
              <h2 className="text-xl font-bold text-[#374151] dark:text-white">
                User Leave Balance
              </h2>
              {role === "admin" && (
                <Button
                  size="small"
                  onClick={openEditModal}
                  className="text-white w-14 border bg-red-500"
                >
                  Edit
                </Button>
              )}
            </div>
            {/* Edit Modal for Admin */}
            <Modal
              title="Edit Leave Balance"
              open={isEditModalOpen}
              onCancel={handleEditModalCancel}
              footer={[
                <Button key="cancel" onClick={handleEditModalCancel}>
                  Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleLeaveUpdate}>
                  Save Changes
                </Button>,
              ]}
            >
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Floater Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.floaterleave}
                        value={editedLeaveCount?.floaterleave}
                        onChange={(value) =>
                          handleLeaveCountChange("floaterleave", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Privilege Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.privilageleave}
                        value={editedLeaveCount?.privilageleave}
                        onChange={(value) =>
                          handleLeaveCountChange("privilageleave", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Sick Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.sickleave}
                        value={editedLeaveCount?.sickleave}
                        onChange={(value) =>
                          handleLeaveCountChange("sickleave", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Casual Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.casualleave}
                        value={editedLeaveCount?.casualleave}
                        onChange={(value) =>
                          handleLeaveCountChange("casualleave", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Unpaid Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.unpaidleave}
                        value={editedLeaveCount?.unpaidleave}
                        onChange={(value) =>
                          handleLeaveCountChange("unpaidleave", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Approved Leaves">
                      <InputNumber
                        min={0}
                        defaultValue={leavecount?.approvedLeaves}
                        value={editedLeaveCount?.approvedLeaves}
                        onChange={(value) =>
                          handleLeaveCountChange("approvedLeaves", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
            {/* available_leave_sections --- start*/}

            <section className="available_leave_section grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full p-5">
              <div className="md:border-r w-full ">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#9AEFCA]">
                    <FaRegClipboard size={35} />
                  </span>
                  <div className="p-2 border rounded-md">
                    <p className="min-w-[5rem] text-black opacity-70 text-xl">
                      Available Leaves
                    </p>
                    <div className="text-4xl text-black">
                      {leavecount?.floaterleave +
                        leavecount?.privilageleave +
                        leavecount?.sickleave +
                        leavecount?.casualleave}
                      <div className="border rounded-md text-xl bg-slate-100">
                        Total 21
                      </div>
                    </div>
                    
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] text-center items-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FBC950]">
                    <BsCalendar4Event size={35} />
                  </span>
                  <div className="p-2 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Floater Leaves
                    </p>
                    <div className="text-4xl text-black">
                      {leavecount?.floaterleave}
                      <div className="border rounded-md text-xl bg-slate-100">
                        Total 1
                      </div>
                    </div>
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#D1B5F0]">
                    <ImStarEmpty size={35} />
                  </span>
                  <div className="p-2 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Privilege Leaves
                    </p>
                    <div className="text-4xl text-black">
                      {leavecount?.privilageleave}
                      <div className="border rounded-md text-xl bg-slate-100">
                        Total 10
                      </div>
                    </div>
                  </div>
                </span>
              </div>

              <div className="md:border-r  w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#C9EF9A]">
                    <MdOutlineSick size={35} />
                  </span>
                  <div className="p-2 px-8 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Sick Leaves
                    </p>

                    <div className="text-4xl text-black">
                      {leavecount?.sickleave}
                    </div>
                    <div className="border rounded-md text-xl bg-slate-100">
                      Total 5
                    </div>
                  </div>
                </span>
              </div>

              <div className="md:border-r w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#AFBF9A]">
                    <PiBagLight size={35} />
                  </span>
                  <div className="p-2 px-3 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Casual Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.casualleave}
                    </p>
                    <div className="border rounded-md text-xl bg-slate-100">
                      Total 5
                    </div>
                  </div>
                </span>
              </div>

              <div className=" w-full">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#F5B8CF]">
                    <LiaRupeeSignSolid size={35} />
                  </span>
                  <div className="p-2 px-4 border rounded-md">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Unpaid Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.unpaidleave}
                    </p>
                  </div>
                </span>
              </div>
            </section>
            {/* available_leave_sections --- ends*/}

            {/* user leave activity --- start*/}
            <div className="w-full flex p-2">
              <h2 className="text-xl font-bold text-[#374151] dark:text-white">
                User Leave Activity
              </h2>
            </div>

            <section className="available_leave_section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full  p-5">
              <div>
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#a3e635]">
                    <FaRegClipboard size={35} />
                  </span>
                  <div className="p-5">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Total Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.totalLeaves}
                    </p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] text-center items-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#d946ef]">
                    <GoHourglass size={35} />
                  </span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Pending Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.pendingLeaves}
                    </p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#14b8a6]">
                    <GoThumbsup size={35} />
                  </span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Approved Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.approvedLeaves}
                    </p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-4 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FF4C4C]">
                    <GoThumbsdown size={35} />
                  </span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Rejected Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.rejectedLeaves}
                    </p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-2 h-[10rem] items-center text-center bg-white dark:bg-slate-300 rounded-lg text-black">
                  <span className="rounded-full p-3 bg-[#FFA500]">
                    <MdOutlineCancel size={35} />
                  </span>
                  <div>
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Cancelled Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.cancelledLeaves}
                    </p>
                  </div>
                </span>
              </div>

              <div className="">
                <span className="flex justify-center gap-2 h-[10rem] items-center text-center bg-white dark:bg-slate-300">
                  <span className="rounded-full p-3 bg-[#BDB76B] text-black">
                    <FaRegCalendarTimes size={35} />
                  </span>
                  <div className="p-4">
                    <p className="flex items-center justify-center text-black opacity-70 text-xl">
                      Expired Leaves
                    </p>
                    <p className="text-4xl text-black">
                      {leavecount?.expiredLeaves}
                    </p>
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
