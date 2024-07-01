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
    <Card className="col-span-3">
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="text-xl">Notifications</h1>
        {role === "admin" && (
          <Button type="default" onClick={() => setOpen(!open)}>
            Create
          </Button>
        )}
      </div>
      <List
        className="overflow-scroll max-h-80 px-1"
        itemLayout="horizontal"
        dataSource={dataArray}
        renderItem={(item, index) => (
          <List.Item className="gap-8 pb-4">
            <Skeleton avatar title={false} active loading={isPending}>
              <List.Item.Meta
                avatar={<Avatar src={`${item.avtar}`} />}
                title={<p className="capitalize font-semibold">{item.title}</p>}
                description={item.description}
              />



              <div className="text-[#999] flex flex-col relative  pb-2">
                {/* Format date here */}
                <span>{format(new Date(item.date), "yyyy-MM-dd hh:mm:ss a")}</span>
                <span>~ {item.username}</span>
              </div>
              <div className="flex absolute cursor-pointer right-0 pt-4 text-sm gap-2">
                {role === "admin" && (
                  <Link onClick={() => handleDelete(item._id)} className="cursor-pointer">
                    <AiOutlineDelete className="text-sm cursor-pointer text-red-600" />
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
