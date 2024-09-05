import React, { useState } from "react";
import { Timeline, Button, Modal, Form, Input } from "antd";
import useGetWorkHistory from "../../features/workhistory/useGetWorkHistory";
import getUserIdRole from "../../utils/getUserIdRole";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { useParams } from "react-router";
import useAddWorkHistory from "../../features/workhistory/useAddWorkHistory";
import useDeleteWorkHistory from "../../features/workhistory/useDeleteWorkHistory";
import { HiXCircle } from "react-icons/hi";
import { CiSquarePlus } from "react-icons/ci";
import { DatePicker, Space } from "antd";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
const { RangePicker } = DatePicker;

const PreviousWork = () => {
  const [form] = Form.useForm();
  const { userId } = useParams();
  const { id, role } = getUserIdRole();
  const { data, isPending } = useGetWorkHistory(!userId ? id : userId);
  const { addwork, CreatePending } = useAddWorkHistory();
  const { deletework, deletePending } = useDeleteWorkHistory();
  const [addWorkModal, setaddWorkModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [skills, setskills] = useState([]);
  const [skill, setskill] = useState("");
  const workhistory = data?.workhistory;
  const sortedData = workhistory?.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  const handleDeleteWork = (id) => {
    deletework(id);
  };
  const removeSills = (skill) => {
    const filterSkils = skills.filter((sk) => sk !== skill);
    setskills(filterSkils);
  };

  const addSkills = () => {
    const specialCharsRegex = /[!@#$%^&*(),?":{}|<>]/;

    if (specialCharsRegex.test(skill)) {
      toast.error("Skill cannot contain special characters");
      return;
    }
    if (skills.includes(skill) || !skill.trim()) {
      toast.error("Please Add new skill");
      return;
    }

    setskills((prevSkills) => [...prevSkills, skill]); // Add the new skill to the skills array
    setskill("");
  };
  const onFinish = (values) => {
    const newData = { ...values, ...dateRange, skills, user: userId };
    addwork(newData);
    form.resetFields(); // Clear form fields
    setDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    setskills([]);
    setskill("");
    setaddWorkModal(false); // Close the modal
  };

  return (
    <div className="p-8 dark:text-white">
      <Modal
        title="Employee Work Experience Add Form"
        open={addWorkModal}
        footer={false}
        closeIcon={
          <HiXCircle size={25} onClick={() => setaddWorkModal(false)} />
        }
      >
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col gap-3"
        >
          <Form.Item
            label="Company Name"
            name="componeyName"
            className=""
            rules={[
              { required: true, message: "Please enter the Company Name" },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="position"
            className=""
            rules={[{ required: true, message: "Please enter the position" }]}
          >
            <Input placeholder="Company Name" className="" />
          </Form.Item>
          <div className="w-fit flex gap-2">
            <Input
              defaultValue={skill}
              placeholder="Add Skills"
              onChange={(e) => setskill(e.target.value)}
            />
            <Button onClick={addSkills}>Add</Button>
          </div>
          <div
            className="flex 
           items-center"
          >
            {skills.map((sk) => {
              return (
                <div
                  key={sk}
                  className="w-fit flex gap-2 border border-black rounded-md px-2"
                >
                  {sk}
                  <button onClick={() => removeSills(sk)}>
                    <RxCross2 />
                  </button>
                </div>
              );
            })}
          </div>

          <Space direction="vertical" size={20} className="w-full">
            <RangePicker
              placeholder={['Joining Date', 'Exit Date']}
              onChange={(e) =>
                setDateRange({ startDate: e[0].$d, endDate: e[1].$d })
              }
            />
          </Space>

          <Form.Item>
            <Button
              type="outline"
              className="bg-blue-300 hover:bg-blue-500"
              htmlType="submit"
              loading={CreatePending}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {role === "admin" && (
        <button className="m-3" onClick={() => setaddWorkModal(true)}>
          <CiSquarePlus size={40} />
        </button>
      )}
      {isPending && "loading..."}
      {sortedData && sortedData.length > 0 ? (
        <Timeline mode="left" pending={isPending}>
          {sortedData.map((item) => (
            <Timeline.Item key={item._id} className="">
              <div className="bg-white text-black w-full p-8 rounded-md">
                <h3 className="text-2xl font-bold">
                  Company Name : {item?.componeyName}
                </h3>
                <p className="text-xl">
                  Joining Date :{" "}
                  {format(new Date(item?.startDate), "d-MM-yyyy")}
                </p>
                <p className="text-xl">
                  Exit Date : {format(new Date(item?.endDate), "d-MM-yyyy")}
                </p>
                <p className="text-xl">Duration : {item?.duration}</p>
                <p className="text-xl">Position : {item?.position}</p>
                <p className="text-xl">
                  Skills: {item?.skills?.join(" - ") || "No skills found"}
                </p>
                {role === "admin" && (
                  <Button
                    danger
                    disabled={deletePending}
                    onClick={() => handleDeleteWork(item?._id)}
                  >
                    <MdDeleteOutline />
                  </Button>
                )}
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <p>No data found!!</p>
      )}
    </div>
  );
};

export default PreviousWork;
