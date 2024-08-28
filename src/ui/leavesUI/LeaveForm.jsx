import { Button, Checkbox, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import getUserIdRole from "../../utils/getUserIdRole";
import useCreateLeaveRequest from "../../features/leaves/useCreateLeaveRequest";
import moment from "moment"; 
import { message } from "antd";

const { RangePicker } = DatePicker;

const LeaveForm = () => {
  const floaterDays = [
    "29-Mar-24/Good Friday",
    "9-Apr-24/Gudi Padawa",
    "11-Apr-24/Ramzan",
    "29-Oct-24/Dhanteras",
  ];
  const { createRequest, isPending } = useCreateLeaveRequest();
  const { id: userId } = getUserIdRole();
  const { TextArea } = Input;
  const [leaveDays, setLeaveDays] = useState(0);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [selectedLeaveType, setSelectedLeaveType] = useState(""); 
  const [form] = Form.useForm();
  const [show, setShow] = useState(false)

  const onFinish = (values) => {
    const { startDate, endDate } = dateRange;
    const leaveStart = startDate ? startDate.toISOString() : null;
    const leaveEnd = endDate ? endDate.toISOString() : null;
    values.leaveDays = leaveDays; 
    const data = { userId, leaveStart, leaveEnd, ...values };
    console.log(data);
    createRequest(data);
    form.resetFields();
    setDateRange({ startDate: null, endDate: null, key: "selection" });
    setLeaveDays(0);
    setShow(false)
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const actualLeaveDays =
        Math.ceil(
          (new Date(dateRange.endDate).getTime() -
            new Date(dateRange.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      setLeaveDays(actualLeaveDays);
      setShow(true)
    } else {
      setLeaveDays(0);
    }
  }, [dateRange]);

  const handleRangeChange = (dates) => {
    if (dates) {
      setDateRange({
        startDate: dates[0]?.toDate(),
        endDate: dates[1]?.toDate(),
        key: "selection",
      });
    } else {
      setDateRange({ startDate: null, endDate: null, key: "selection" });
    }
  };

  const handleLeaveTypeChange = (value) => {
    setSelectedLeaveType(value);
  };

  function handleClear() {
    setDateRange({ startDate: null, endDate: null, key: "selection" });
    form.resetFields();
    message.info("Form clear successfully.");
    setShow(false)
  }

  return (
    <div className="bg-white p-5 rounded-md font-medium">
      <h1 className="text-center text-xl font-bold mb-3 text-[#7498D0]">
        Vionsys Leave Request Form
      </h1>
      <p className="p-2">
        In case of a one-day leave, just select the start date.
      </p>
      <div title="leave Form" visible={true} footer={false}>
        <div className="flex w-full mb-4">
          <Space direction="vertical" size={20}>
            <RangePicker
              value={
                dateRange.startDate && dateRange.endDate
                  ? [moment(dateRange.startDate), moment(dateRange.endDate)]
                  : []
              }
              onChange={handleRangeChange}
            />
          </Space>
        </div>
        <Form
          form={form}
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="flex justify-between gap-8">
            {selectedLeaveType !== "Floater Leave" && (
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter Leave Days
                </label>
                <Input
                  placeholder="Leave Days"
                  type="number"
                  value={leaveDays}
                  disabled={true}
                  className="w-full"
                />
              </div>
            )}
            <Form.Item
              label="Leave Mode"
              name="halfDay"
              valuePropName="checked"
              className="w-full"
            >
              <Checkbox>Half Day</Checkbox>
            </Form.Item>

            <Form.Item
              label="Select Leave Type"
              name="leaveType"
              className="w-full"
              rules={[
                { required: true, message: "Please select Leave Reason " },
              ]}
            >
              <Select onChange={handleLeaveTypeChange} placeholder="Leave Type">
                <Select.Option value="Sick Leave">Sick Leave</Select.Option>
                <Select.Option value="Casual Leave">Casual Leave</Select.Option>
                <Select.Option value="Floater Leave">
                  Floater Leave
                </Select.Option>
                <Select.Option value="Privilage Leave">
                  Privilage Leave
                </Select.Option>
                <Select.Option value="Unpaid Leave">Unpaid Leave</Select.Option>
              </Select>
            </Form.Item>

            {selectedLeaveType === "Floater Leave" && (
              <Form.Item
                label="Select Floater Date"
                name="floaterDay"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please Select Floater Leave Date ",
                  },
                ]}
              >
                <Select>
                  {floaterDays.map((days) => (
                    <Select.Option value={days} key={days}>
                      {days}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </div>
          <Form.Item
            label="Reason"
            name="leaveReason"
            rules={[{ required: true, message: "Please enter Leave reason" }]}
          >
            <TextArea rows={4} placeholder="Reason for leave request" />
          </Form.Item>

          
            <div className="flex justify-between">
            <Form.Item>
            <Button
              disabled={isPending}
              type="primary"
              className="bg-[#7498D0] hover:bg-slate-500"
              htmlType="submit"
            >
              Apply for leave
            </Button>
            </Form.Item>
            {show?(<Button
              disabled={isPending}
              onClick={handleClear}
              type="text"
              className="bg-[#f75341] text-white hover:bg-red-700"
              htmlType="reset"
            >
              Clear
            </Button>):""}
            </div>
          
         
        </Form>
      </div>
    </div>
  );
};

export default LeaveForm;
