import { Button, Form, Input, Modal } from "antd";
import { HiXCircle } from "react-icons/hi";
import { useState } from "react";
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useGetExcel from "../features/attendance/useGetExcel";
import useGetExcelById from "../features/attendance/useGetExcelById";

const ExcelForm = ({ isModalOpen, setIsModalOpen, userId }) => {
  const { getExcel, isPending } = useGetExcel();
  const { getExcelByid, isPending2 } = useGetExcelById();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const { email } = values;
    const { startDate, endDate } = dateRange;
    const Format_startDate = format(startDate, "yyyy-MM-dd");
    const Format_endDate = format(endDate, "yyyy-MM-dd");
    if (userId) {
      getExcelByid({ Format_startDate, Format_endDate, email, userId });
      return;
    }
    getExcel({ Format_startDate, Format_endDate, email });
  };

  return (
    <div className="">
      <Modal
        title="Send Attendance in Excel Format"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<HiXCircle size={25} onClick={handleCancel} />}
      >
        <div className="Date_Picker">
          <DateRangePicker
            ranges={[dateRange]}
            onChange={(ranges) => setDateRange(ranges.selection)}
            maxDate={new Date()}
          />
        </div>
        <Form
          name="myForm"
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isPending || isPending2}
              type="primary"
              className="bg-slate-600 hover:bg-slate-500"
              htmlType="submit"
            >
              Send to mail
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExcelForm;
