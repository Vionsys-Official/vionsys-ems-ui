import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, List, Skeleton } from "antd";
import ReactConfetti from "react-confetti";
import { useGetBirthdaysFromMonth } from "../../features/users/useGetBirthdaysFromMonth";
import { format } from "date-fns";

const HighlightsBDWA = () => {
  const { birthdays, isLoading } = useGetBirthdaysFromMonth();
  const TodaysBirthday = birthdays?.usersToday;
  const UpcomingBirthday = birthdays?.usersInMonth;
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  useEffect(() => {
    if (TodaysBirthday && TodaysBirthday?.length > 0) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [TodaysBirthday]);

  return (
    <Card className="col-span-1 dark:bg-gray-700 shadow-2xl dark:shadow-zinc-500 border-none relative">
      <h3 className="text-xl font-semibold border-b-2 dark:text-white rounded-full py-2 border-orange-500 text-center">
        Highlights
      </h3>
      {showConfetti && (
        <ReactConfetti
          width={400}
          height={300}
          numberOfPieces={280}
          gravity={0.1}
          tweenDuration={9000}
          recycle={false} // Set to false to stop confetti immediately after it's rendered
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        />
      )}
      {TodaysBirthday && TodaysBirthday?.length > 0 && (
        <List
          className="overflow-scroll pt-4 max-h-40 px-1 border-b"
          itemLayout="horizontal"
          dataSource={TodaysBirthday}
          renderItem={(item, index) => (
            <List.Item className="bg-white rounded-lg mb-1">
              <Skeleton avatar title={false} active loading={isLoading}>
                <List.Item.Meta
                  className="px-3 dark:text-white"
                  avatar={<Avatar src={`${item.profile}`} />}
                  title={
                    <p className="capitalize font-semibold">
                      {item.firstName}&nbsp;{item.lastName}
                    </p>
                  }
                  description={
                    <p className="text-green-500 font-semibold ">Birthday</p>
                  }
                />
                <div className="text-[#999] px-4 flex flex-col relative  pb-2">
                  <span>{format(new Date(item.dob), "d MMMM")}</span>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      )}
      {UpcomingBirthday && UpcomingBirthday?.length > 0 && (
        <List
          className="overflow-scroll pt-4 max-h-40 px-1 border-b dark:border-zinc-500 "
          itemLayout="horizontal"
          dataSource={UpcomingBirthday}
          renderItem={(item, index) => (
            <List.Item className=" rounded-md">
              <Skeleton avatar title={false} active loading={isLoading}>
                <List.Item.Meta
                  className="px-3 dark:text-white"
                  avatar={<Avatar className="mt-2" src={`${item.profile}`} />}
                  title={
                    <p className="capitalize dark:text-white  font-semibold">
                      {item.firstName}&nbsp;{item.lastName}
                    </p>
                  }
                  description={
                    <p className="text-yellow-500 font-semibold ">
                      Upcoming Birthday
                    </p>
                  }
                />
                <div className="text-[#999] px-4 flex dark:text-white flex-col relative  pb-2">
                  <span>{format(new Date(item.dob), "d MMMM")}</span>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      )}
      {!UpcomingBirthday && !TodaysBirthday ? (
        <div className="flex justify-center items-center">
          <h4>No special event in this month!!!</h4>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default HighlightsBDWA;
