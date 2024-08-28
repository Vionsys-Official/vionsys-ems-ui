import React, { useState } from "react";
import { Table } from "antd";
import useGetKitdetails from "../../features/joiningKit/useGetKitdetails";
import { format } from "date-fns";
import { useParams } from "react-router";
import { CiGift } from "react-icons/ci";
import AddWelcomeKit from "../Employees/AddWelcomeKit";
import { Tooltip } from "antd";
import { Button } from "antd";
import useUpdateWelcomeKit from "../../features/joiningKit/useUpdateWelcomeKit";

const JoiningKitOfEmpForAdmin = () => {
    const { userId } = useParams();
    const [isWelcomeKitModalOpen, setIsWelcomeKitModalOpen] = useState(false);
    const { data, isPending } = useGetKitdetails(userId);
    const KitData = data?.kits;
    const { kitReturnPending, returnKit } = useUpdateWelcomeKit();
    const handleUpdate = (_id) => {
        returnKit(_id);
    }
    const KitdatColumns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            hidden: true,
        },
        {
            title: "Accessory Name",
            dataIndex: "accessoryName",
            key: "accessoryName",
        },
        {
            title: "Accessory Company",
            dataIndex: "accessoryCompany",
            key: "accessoryCompany",
        },
        {
            title: "Accessory Id",
            dataIndex: "accessoryId",
            key: "accessoryId",
        },
        {
            title: "Assigned Date",
            dataIndex: "assignDate",
            key: "assignDate",
            render: (date) => (date ? format(new Date(date), "MM/dd/yyyy") : ""),
        },
        {
            title: "Assigned By",
            dataIndex: "assignBy",
            key: "assignBy",
        },
        {
            title: "Returned Date",
            dataIndex: "returnedDate",
            key: "returnedDate",
            render: (date) => (date ? format(new Date(date), "MM/dd/yyyy") : "-"),
        },
        {
            title: 'Actions',
            render: (_, record) => {
                const returnedDate = record.returnedDate;
                const isDisabled = returnedDate !== undefined;
                const buttonText = isDisabled ? "Returned" : "Return";
                const tooltipText = isDisabled ? "Already Returned" : "Return Accessory";
                return (
                    <div>
                        <Tooltip title={tooltipText}>
                            <Button className="bg-red-600 border border-red-600 text-white" loading={kitReturnPending} onClick={() => handleUpdate(record._id)} disabled={isDisabled}>{buttonText}</Button>
                        </Tooltip>
                    </div>
                )
            }
        }
    ];
    return (
        <main className="flex flex-col gap-4 ">
            {/* Add welcome kit for the user */}
            <AddWelcomeKit isModalOpen={isWelcomeKitModalOpen} setIsModalOpen={setIsWelcomeKitModalOpen} userId={userId} />
            <div className="flex gap-2 flex-col justify-center items-center">
                <Tooltip placement="top" title="Joining Kit">
                    <Button type="default" onClick={() => setIsWelcomeKitModalOpen(!isWelcomeKitModalOpen)} className="text-white bg-blue-400 flex justify-center items-center gap-2"><CiGift size={20} /> <span>Add Accessory</span></Button>
                </Tooltip>
            </div>
            {
                !isPending && (
                    <Table dataSource={KitData} columns={KitdatColumns} className="px-5" />
                )
            }
        </main>
    );
};

export default JoiningKitOfEmpForAdmin;
