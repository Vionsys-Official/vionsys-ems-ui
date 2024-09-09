import { Avatar, Button, Card, List, Skeleton } from "antd";
import { useState } from "react";
import useGetNotification from "../features/notification/useGetNotification";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import NotificationForm from "./NotificationForm";
import useDeleteNotification from "../features/notification/useDeleteNotification";
import getUserIdRole from "../utils/getUserIdRole";
import { format, isToday } from "date-fns";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const { role } = getUserIdRole();
  const { data, isPending } = useGetNotification();

  let dataArray = data ? [...Object.values(data.notifications)] : [];

  // Sort dataArray based on the date field, with current date data first
  dataArray.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (isToday(aDate) && !isToday(bDate)) return -1; // Current date data comes first
    if (!isToday(aDate) && isToday(bDate)) return 1; // Current date data comes first
    return bDate - aDate; // Sort by date if both are current date or both are other dates
  });

  const { deletes } = useDeleteNotification();
  const handleDelete = (id) => {
    deletes(id);
  };

  return (
    <Card className="col-span-2 dark:border-none dark:bg-gray-700">
      <div className="flex justify-between px-6 items-center border-b-2 rounded-3xl border-orange-500 pb-2">
        <h1 className="text-xl dark:text-white">Notifications</h1>
        {role === "admin" && (
          <Button className="bg-green-500 dark:border-none text-white hover:bg-green-600" type="default" onClick={() => setOpen(!open)}>
            Create
          </Button>
        )}
      </div>
      <List
        className="overflow-scroll max-h-80 px-1 "
        itemLayout="horizontal"
        dataSource={dataArray}
        renderItem={(item, index) => (
          <List.Item className=" border-b dark:border-zinc-500 dark:border-b">
            <Skeleton avatar title={false} active loading={isPending}>
              <List.Item.Meta
                avatar={<Avatar className="mt-2" src={`${item.avtar}`} />}
                title={<p className="capitalize dark:text-white font-semibold">{item.title}</p>}
                description={<p className="dark:text-zinc-300">{item.description}</p>}
              />
              <div className="text-[#999] dark:text-zinc-300 justify-center items-center flex flex-col relative space-y-1  pb-2">
                {/* Format date here */}
                <span className="text-sm">{format(new Date(item.date), "MM/dd/yyyy")}</span>
                <span className="text-sm">{format(new Date(item.date), "hh:mm:ss a")}</span>
                <span className="text-sm">~ {item.username}</span>
              </div>
              <div className="flex absolute cursor-pointer right-24 text-sm gap-2">
                {role === "admin" && (
                  <Link onClick={() => handleDelete(item._id)} className="cursor-pointer">
                    <AiOutlineDelete size={26} className="relative text-sm cursor-pointer hover:bg-red-700 bg-red-600 rounded-full p-1 text-white" />
                  </Link>
                )}
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
      {/* Create Notification Modal */}
      <NotificationForm showModal={setOpen} isShowModal={open} />
    </Card>
  );
};

export default Notifications;
