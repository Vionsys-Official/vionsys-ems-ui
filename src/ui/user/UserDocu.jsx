import React, { useState } from "react";
import useGetAllDocuments from "../../features/documents/useGetAllDocuments";
import getUserIdRole from "../../utils/getUserIdRole";
import { Button, Form, Input, Modal, Spin, Table, Space, Tooltip } from "antd";
import pdfSample from "/assets/PdfSample.png";
import imageSample from "/assets/ImageSample.png";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import { render } from "react-dom";

const UserDocu = () => {
  const { id: userId } = getUserIdRole(); // Get the current logged-in user ID
  const [form] = Form.useForm();

  // Fetch documents for the specific user
  const { data: documents, isLoading: isFetchingDocuments } =
    useGetAllDocuments(userId);
    console.log("documents", documents);
  const [visible, setVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const isPDF = (imageURL) => imageURL.toLowerCase().endsWith(".pdf");

  const handlePreview = (imageURL, isPDF) => {
    setPreviewFile({ url: imageURL, isPDF });
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setPreviewFile(null);
  };

  //Column

  const columns = [
    {
      title: "Document",
      dataIndex: "imageURL",
      key: "image",
      render: (imageURL) =>
        isPDF(imageURL) ? (
          <img
            src={pdfSample}
            alt="Document"
            className="w-16 h-16 object-cover cursor-pointer"
            onClick={() => handlePreview(imageURL, true)}
          />
        ) : (
          <img
            src={imageSample}
            alt="Document"
            className="w-16 h-16 object-cover cursor-pointer"
            onClick={() => handlePreview(imageURL, false)}
          />
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? format(new Date(date), "dd-MM-yyyy") : "NA"),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => (date ? format(new Date(date), "dd-MM-yyyy") : "NA"),
    },
  ];

  const tableData = documents?.data.map((doc) => ({
    key: doc._id,
    imageURL: doc.imageURL,
    title: doc.title,
    createdAt: doc.uploadedAt,
    updatedAt: doc.updatedAt,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 flex justify-center">
        My Documents
      </h2>
      {isFetchingDocuments ? (
        <p className="text-center text-gray-500">Loading documents...</p>
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
     
      <Modal
        title="Document Preview"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        {previewFile && (
          <div className="flex flex-col items-center">
            {previewFile.isPDF ? (
              <embed
                src={previewFile.url}
                type="application/pdf"
                width="100%"
                height="500px"
              />
            ) : (
              <img
                src={previewFile.url}
                alt="Preview"
                className="w-full h-auto mb-4"
              />
            )}
            <a
              href={
                previewFile.isPDF
                  ? previewFile.url
                  : `${previewFile.url.replace(
                      "/upload/",
                      "/upload/fl_attachment/"
                    )}`
              }
              download={previewFile.isPDF ? "document.pdf" : "image.png"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Download
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDocu;
