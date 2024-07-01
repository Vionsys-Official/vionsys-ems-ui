import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, List, Skeleton } from "antd";
import ReactConfetti from 'react-confetti';
import { useGetBirthdaysFromMonth } from "../../features/users/useGetBirthdaysFromMonth";
import { format } from 'date-fns';

const HighlightsBDWA = () => {
    const { birthdays, isLoading } = useGetBirthdaysFromMonth();
    const TodaysBirthday = birthdays?.usersToday;
    const UpcomingBirthday = birthdays?.usersInMonth;
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [showConfetti, setShowConfetti] = useState(false);

    const detectSize = () => {
        setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => window.removeEventListener('resize', detectSize);
    }, []);

    useEffect(() => {
        if (TodaysBirthday && TodaysBirthday?.length > 0) {
            setShowConfetti(true);
        } else {
            setShowConfetti(false);
        }
    }, [TodaysBirthday]);


    return (
        <Card className="col-span-1 shadow-md relative">
            <h3 className='pb-2 font-semibold'>Highlights</h3>
            {showConfetti && (
                <ReactConfetti
                    width={400}
                    height={300}
                    numberOfPieces={280}
                    gravity={0.1}
                    tweenDuration={9000}
                    recycle={false} // Set to false to stop confetti immediately after it's rendered
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                />
            )}
            {TodaysBirthday && TodaysBirthday?.length > 0 && (
                <List
                    className="overflow-scroll max-h-40 border-b"
                    itemLayout="horizontal"
                    dataSource={TodaysBirthday}
                    renderItem={(item, index) => (
                        <List.Item className="bg-cyan-100 rounded-lg mb-1">
                            <Skeleton avatar title={false} active loading={isLoading}>
                                <List.Item.Meta
                                    avatar={<Avatar src={`${item.profile}`} />}
                                    title={<p className="capitalize font-semibold">{item.firstName}&nbsp;{item.lastName}</p>}
                                    description="Birthday"
                                />
                                <div className="text-[#999] flex flex-col relative  pb-2">
                                    <span>{format(new Date(item.dob), "dd/MM/yyyy")}</span>
                                </div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            )}
            {UpcomingBirthday && UpcomingBirthday?.length > 0 && (
                <List
                    className="overflow-scroll max-h-40 px-1 border-b"
                    itemLayout="horizontal"
                    dataSource={UpcomingBirthday}
                    renderItem={(item, index) => (
                        <List.Item className="pb-4 bg-yellow-100 mb-1 rounded-md">
                            <Skeleton avatar title={false} active loading={isLoading}>
                                <List.Item.Meta
                                    avatar={<Avatar src={`${item.profile}`} />}
                                    title={<p className="capitalize font-semibold">{item.firstName}&nbsp;{item.lastName}</p>}
                                    description="Upcoming Birthday"
                                />
                                <div className="text-[#999] flex flex-col relative  pb-2">
                                    <span>{format(new Date(item.dob), "dd/MM/yyyy")}</span>
                                </div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            )}
            {
                UpcomingBirthday && TodaysBirthday ? (
                    <div className='flex justify-center items-center'>
                        <h4>No special event in this month!!!</h4>
                    </div>
                ) : ''
            }
        </Card>
    )
}

export default HighlightsBDWA;
