import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { HiXCircle } from "react-icons/hi";
import useSignup from "../features/authentication/useSignup";
import { useState } from "react";
import { useFormData } from "../features/users/useFormData";

const CreateNewUser = ({ isModalOpen, setIsModalOpen }) => {
  const [file, setFile] = useState();
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genders = ["Male", "Female", "Other"];
  const { Option } = Select;
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { signup, isPending } = useSignup();

  const onFinish = (values) => {
    const form = new FormData();
    for (const key in values) {
      form.append(key, values[key]);
    }
    form.append("file", file);

    signup(form, {
      onSettled: () => {
        handleCancel();
      },
    });
  };

  return (
    <div className="">
      <Modal
        width={700}
        title="Create new user"
        open={isModalOpen}
        closeIcon={<HiXCircle size={25} onClick={handleCancel} />}
        footer={false}
      >
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          {/* First Name and Last Name */}
          <div className="flex flex-wrap gap-x-4">
            {/* First Name */}
            <Form.Item
              label="First Name"
              name="firstName"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              label="Last Name"
              name="lastName"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          {/* Email and Personal Email */}
          <div className="flex flex-wrap gap-x-4">
            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            {/* Personal Email */}
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your personal email" },
                {
                  type: "email",
                  message: "Please enter a valid personal email address",
                },
              ]}
            >
              <Input placeholder="Personal Email" type="email" />
            </Form.Item>
          </div>
          {/* Add Upload Component for Image */}
          <Form.Item
            label="Upload Image"
            name="file"
            value={file}
            className="flex-1"
            extra="Upload employee profile image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              value={file}
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Item>

          {/* Address, Blood Group, and Gender */}
          <div className="flex flex-wrap gap-x-4">
            {/* Temporary Address */}
            <Form.Item
              label="Temporary Address"
              name="TempAddress"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter Temporary employee address",
                },
              ]}
            >
              <Input placeholder="Temporary Address" type="text" />
            </Form.Item>

            {/* Permanent Address */}
            <Form.Item
              label="Permanent Address"
              name="PerAddress"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter Permanent employee address",
                },
              ]}
            >
              <Input placeholder="Permanent Address" type="text" />
            </Form.Item>
          </div>

          <div className="flex flex-wrap gap-x-4">
            {/* Blood Group */}
            <Form.Item
              label="Blood Group"
              name="bloodGroup"
              className="flex-1"
              rules={[{ required: true, message: "Please select blood group" }]}
            >
              <Select placeholder="Select Blood Group">
                {bloodGroups.map((group) => (
                  <Option key={group} value={group}>
                    {group}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Gender */}
            <Form.Item
              label="Gender"
              name="gender"
              className="flex-1"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select Gender">
                {genders.map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Phone Numbers */}
          <div className="flex flex-wrap gap-x-4">
            {/* Contact Number */}
            <Form.Item
              label="Contact Number"
              name="phone"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter employee contact number",
                },
              ]}
            >
              <Input placeholder="Contact Number" type="number" />
            </Form.Item>

            {/* Emergency Contact */}
            <Form.Item
              label="Emergency Contact"
              name="emergencyPhone"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter employee emergency contact number",
                },
              ]}
            >
              <Input placeholder="Emergency Contact" type="number" />
            </Form.Item>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-x-4">
            {/* Date of Birth */}
            <Form.Item
              label="Date of Birth"
              name="dob"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter employee date of birth",
                },
              ]}
            >
              <Input placeholder="Date of Birth" type="date" />
            </Form.Item>

            {/* Date of Joining */}
            <Form.Item
              label="Date of Joining"
              name="doj"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter employee date of joining",
                },
              ]}
            >
              <Input placeholder="Date of Joining" type="date" />
            </Form.Item>
          </div>

          {/* Passwords */}
          <div className="flex flex-wrap gap-x-4">
            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              className="flex-1"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long",
                },
              ]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              className="flex-1"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Confirm Password" type="password" />
            </Form.Item>
          </div>

          {/* Employee ID and Designation */}
          <div className="flex flex-wrap gap-x-4">
            {/* Employee ID */}
            <Form.Item label="Employee ID" name="employeeId" className="flex-1">
              <Input placeholder="Employee ID" type="number" />
            </Form.Item>

            {/* Designation */}
            <Form.Item
              label="Designation"
              name="designation"
              className="flex-1"
            >
              <Input placeholder="Designation" type="text" />
            </Form.Item>
          </div>

          {/* Reporting Manager and Team Lead */}
          <div className="flex flex-wrap gap-x-4">
            {/* Reporting Manager */}
            <Form.Item
              label="Reporting Manager"
              name="reportingManager"
              className="flex-1"
            >
              <Select defaultValue="Select">
                <Option value="Shubham Kale">Shubham Kale</Option>
                <Option value="Pankaj Kandhare">Pankaj Kandhare</Option>
                <Option value="Govind Rathod">Govind Rathod</Option>
                <Option value="Nilam Rathod">Nilam Rathod</Option>
              </Select>
            </Form.Item>

            {/* Team Lead */}
            <Form.Item label="Team Lead" name="teamLead" className="flex-1">
              <Select defaultValue="Select">
                <Option value="Shubham Kale">Shubham Kale</Option>
                <Option value="Pankaj Kandhare">Pankaj Kandhare</Option>
                <Option value="Govind Rathod">Govind Rathod</Option>
                <Option value="Nilam Rathod">Nilam Rathod</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              className="bg-slate-600 hover:bg-slate-500"
              htmlType="submit"
              loading={isPending}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateNewUser;
