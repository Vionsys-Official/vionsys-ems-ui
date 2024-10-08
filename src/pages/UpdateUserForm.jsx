import { Button, Form, Input, Select, AutoComplete } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import useUpdate from "../features/authentication/useUpdate";
import { useUpdateFormData } from "../features/users/useUpdateFormData";
import useGetAllUsers from "../features/users/useGetAllUsers";

const UpdateUserForm = () => {
  const [file, setFile] = useState();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { update, isPending } = useUpdate();
  const { user } = useGetCurrentUser(userId);
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    const filteredOptions = availableEmployees
      ?.filter((employee) =>
        employee.name.toLowerCase().includes(value.toLowerCase())
      )
      .map((employee) => ({ value: employee.name }));

    setOptions(filteredOptions);
  };

  const { allUsers } = useGetAllUsers();
  const allEmployees = allUsers?.data?.users;

  const availableEmployees = allEmployees?.map((user) => {
    return {
      name: `${user.firstName} ${user.lastName}`,
    };
  });
  let userObject = user?.data.user;
  userObject = {
    ...userObject,
    dob: userObject?.dob
      ? new Date(userObject.dob).toLocaleDateString("en-CA").replace(/\//g, "-")
      : null,
    doj: userObject?.doj
      ? new Date(userObject.doj).toLocaleDateString("en-CA").replace(/\//g, "-")
      : null,
  };
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genders = ["Male", "Female", "Other"];
  const onFinish = (values) => {
    if (file) {
      const {
        _id,
        firstName,
        lastName,
        email,
        employeeId,
        designation,
        teamLead,
        reportingManager,
        personalEmail,
        address,
        gender,
        bloodGroup,
        phone,
        dob,
        doj,
        emergencyPhone,
        PerAddress,
        TempAddress,
        role,
      } = values;
      const form = useUpdateFormData(
        _id,
        firstName,
        lastName,
        email,
        employeeId,
        designation,
        teamLead,
        personalEmail,
        reportingManager,
        file,
        address,
        gender,
        bloodGroup,
        phone,
        dob,
        doj,
        emergencyPhone,
        PerAddress,
        TempAddress,
        role
      );
      update(form);
    } else {
      update(values);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="px-4 py-4 bg-white w-[75%] border rounded-xl relative">
        <CloseOutlined
          className="absolute top-4 right-4 text-base cursor-pointer bg-slate-500 hover:bg-slate-400 rounded-full p-1 text-white"
          onClick={handleCancel}
        />
        <h4 className="text-center pb-4 font-bold text-yellow-300 text-2xl">
          Update Employee Data
        </h4>
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
          initialValues={userObject}
        >
          {/* hidden form field */}
          <Form.Item hidden={true} name="_id" className="flex-1">
            <Input type="hidden" />
          </Form.Item>
          {/* section of firstName and lastName */}
          <div className="flex flex-wrap gap-x-4">
            {/* First Name */}
            <Form.Item label="First Name" name="firstName" className="flex-1">
              <Input placeholder="First Name" />
            </Form.Item>

            {/* Last Name */}
            <Form.Item label="Last Name" name="lastName" className="flex-1">
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          {/* Email and Personal Email */}
          <div className="flex flex-wrap gap-x-4">
            {/* Email */}
            <Form.Item label="Email" name="email" className="flex-1">
              <Input placeholder="Email" type="email" />
            </Form.Item>

            {/* Personal Email */}
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              className="flex-1"
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
          >
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
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
            <Form.Item label="Blood Group" name="bloodGroup" className="flex-1">
              <Select placeholder="Select Blood Group">
                {bloodGroups.map((group) => (
                  <Select.Option key={group} value={group}>
                    {group}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Gender */}
            <Form.Item label="Gender" name="gender" className="flex-1">
              <Select placeholder="Select Gender">
                {genders.map((gender) => (
                  <Select.Option key={gender} value={gender}>
                    {gender}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Phone Numbers */}
          <div className="flex flex-wrap gap-x-4">
            {/* Contact Number */}
            <Form.Item label="Contact Number" name="phone" className="flex-1">
              <Input placeholder="Contact Number" type="number" />
            </Form.Item>

            {/* Emergency Contact */}
            <Form.Item
              label="Emergency Contact"
              name="emergencyPhone"
              className="flex-1"
            >
              <Input placeholder="Emergency Contact" type="number" />
            </Form.Item>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-x-4">
            {/* Date of Birth */}
            <Form.Item label="Date of Birth" name="dob" className="flex-1">
              <Input placeholder="Date of Birth" type="date" />
            </Form.Item>

            {/* Date of Joining */}
            <Form.Item label="Date of Joining" name="doj" className="flex-1">
              <Input placeholder="Date of Joining" type="date" />
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
              <AutoComplete
                options={options}
                onSearch={handleSearch}
                placeholder="Select"
                filterOption={false} // So it only relies on the custom search logic
              />
            </Form.Item>

            {/* Team Lead */}
            <Form.Item label="Team Lead" name="teamLead" className="flex-1">
              <AutoComplete
                options={options}
                onSearch={handleSearch}
                placeholder="Select"
                filterOption={false} // So it only relies on the custom search logic
              />
            </Form.Item>

            {/* Role */}
            <Form.Item label="Role" name="role" className="flex-1">
              <Select defaultValue="Select">
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
