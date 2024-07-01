import React, { useState } from "react";
import getholidayList from "../features/holiday/useGetHolidays";
import { Table, Select, Button, Modal, DatePicker, Input } from "antd";
import { format } from "date-fns";
import toast from "react-hot-toast";
import getUserIdRole from "../utils/getUserIdRole";
import { MdOutlineCancel } from "react-icons/md";
import { HiXCircle } from "react-icons/hi";
import useDeleteHoliday from "../features/holiday/useDeleteHoliday";
import useCreateHoliday from "../features/holiday/useCreateHoliday";

const HolidayCalander = () => {
  const { role } = getUserIdRole();
  const [year, setYear] = useState(new Date().getFullYear());
  const [mode, setMode] = useState("fixed");
  const [hoildayId, sethoildayId] = useState(undefined);
  const [modal, setmodal] = useState(false);
  const [creationmodal, setcreationmodal] = useState(false);
  const { data, isPending } = getholidayList(year);
  const { deleteHoliday, deletePending } = useDeleteHoliday();
  const { createHoliday, CreatePending } = useCreateHoliday();
  const fixedHolidays = data?.fixedHolidays;
  const floaterHolidays = data?.floaterHolidays;
  const [hoildayDetails, sethoildayDetails] = useState({
    holidayName: "",
    date: "",
    holidayType: "",
  });

  const columns = [
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (date ? format(new Date(date), "dd MMM yyyy") : ""),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Type",
      dataIndex: "holidayType",
      key: "holidayType",
    },
    {
      title: "Cancel Holiday",
      dataIndex: "_id",
      key: "_id",
      render: (id) =>
        role == "admin" ? (
          <Button
            icon={<MdOutlineCancel size={25} />}
            onClick={() => {
              setmodal(true);
              sethoildayId(id);
            }}
          />
        ) : null,
    },
  ];
  if (role != "admin") {
    columns.splice(
      columns.findIndex((column) => column.key === "_id"),
      1
    );
  }

  const handleHolidayDelete = () => {
    deleteHoliday(hoildayId, {
      onSuccess: () => setmodal(false),
    });
  };

  const handleAddHoliday = () => {
    const year = +hoildayDetails?.date?.slice(0, 4);
    const data = { ...hoildayDetails, year };
    if (
      !hoildayDetails?.date ||
      !hoildayDetails?.holidayName ||
      !hoildayDetails?.holidayType
    ) {
      toast.error("please fill all fields");
      return;
    }
    createHoliday(data, {
      onSettled: () => {
        sethoildayDetails({
          ...hoildayDetails,
          holidayName: "",
          date: "",
          holidayType: "",
        });
        setcreationmodal(false);
      },
    });
  };

  return (
    <div>
      {/* holiday delete modal form */}
      <Modal
        className="delete_holiday"
        title="Delete Holiday from calender"
        open={modal}
        onCancel={() => setmodal(false)}
        footer={null}
        closeIcon={<HiXCircle size={25} onClick={() => setmodal(false)} />}
      >
        <p className="text-red-500 py-3">
          Do you really want to delete this holiday from calender, this action
          cannot be undone !
        </p>
        <Button disabled={deletePending} onClick={handleHolidayDelete}>
          Delete
        </Button>
      </Modal>

      {/* create holiday modal form */}
      <Modal
        title="Create new holiday in the calender"
        open={creationmodal}
        onCancel={() => setcreationmodal(false)}
        footer={null}
        closeIcon={
          <HiXCircle size={25} onClick={() => setcreationmodal(false)} />
        }
      >
        <div className="gap-3 flex flex-col py-3">
          <Input
            placeholder="Enter Holiday Name"
            defaultValue={""}
            onChange={(e) => {
              sethoildayDetails((prevState) => ({
                ...prevState,
                holidayName: e.target.value,
              }));
            }}
          />
          <div className="flex gap-2 ">
            <DatePicker
              defaultValue={""}
              className="w-full"
              onChange={(data, dateString) =>
                sethoildayDetails((prevState) => ({
                  ...prevState,
                  date: dateString,
                }))
              }
            />
            <Select
              onChange={(value) =>
                sethoildayDetails((prevState) => ({
                  ...prevState,
                  holidayType: value,
                }))
              }
              placeholder="Holiday Type"
              defaultValue={""}
              className="w-full"
            >
              <Select.Option value="Fixed Holiday">Fixed Holiday</Select.Option>
              <Select.Option value="Floater Holiday">
                Floater Holiday
              </Select.Option>
            </Select>
          </div>
        </div>
        <Button disabled={CreatePending} onClick={handleAddHoliday}>
          Add to Calender
        </Button>
      </Modal>
      <div>
        <div className="flex items-center w-fit justify-center gap-2 p-2">
          <h1 className="text-3xl font-semibold">Holidays for year</h1>
          <Select
            onChange={(e) => setYear(e)}
            defaultValue={new Date().getFullYear()}
            placeholder="Calender Year"
          >
            <Select.Option value={2024}>2024</Select.Option>
            <Select.Option value={2025}>2025</Select.Option>
            <Select.Option value={2026}>2026</Select.Option>
            <Select.Option value={2027}>2027</Select.Option>
            <Select.Option value={2028}>2028</Select.Option>
          </Select>
        </div>
        <p className="px-5">You can see a list of holidays in the calendar year.</p>
      </div>
      <div className="flex justify-center items-center gap-3 m-3">
        {
          mode === "fixed" ? "" : (
            <div className="px-4 py-1 text-red-500 bg-white rounded-md">
              <h3>You can take only one floater leave.</h3>
            </div>
          )
        }
        <div className="w-fit border-b border-black p-2">
          <button
            className={`px-3 py-1  rounded-lg ${mode === "fixed" ? "bg-blue-400 text-white" : ""
              }`}
            onClick={() => setMode("fixed")}
          >
            Fixed Holidays
          </button>
          {/* Button to switch to Floater Holidays mode */}
          <button
            className={`px-3 py-1 rounded-lg ${mode === "floater" ? "bg-blue-400 text-white" : ""
              }`}
            onClick={() => setMode("floater")}
          >
            Floater Holidays
          </button>
        </div>
        <div className="holiday_create">
          {role == "admin" && (
            <Button type="default" className="bg-white" onClick={() => setcreationmodal(true)}>
              Create a new Holiday
            </Button>
          )}
        </div>
      </div>
      {/* Render table based on mode */}
      {isPending ? (
        "Loading..."
      ) : (
        <Table
          dataSource={mode === "fixed" ? fixedHolidays : floaterHolidays}
          columns={columns}
          className="px-5"
        />
      )}

    </div>
  );
};

export default HolidayCalander;
