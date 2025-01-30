import React, { useState, useRef } from "react";
import useGetAllDocuments from "../../features/documents/useGetAllDocuments";
import useAddDocuments from "../../features/documents/useAddDocument";
import useDeleteDocument from "../../features/documents/useDeleteDocument";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Modal, Spin, Table, Space, Tooltip } from "antd";
import useUpdateDocument from "../../features/documents/useUpdateDocuments";
import getUserIdRole from "../../utils/getUserIdRole";
import pdfSample from "/assets/PdfSample.png";
import imageSample from "/assets/ImageSample.png";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const Documents = () => {
  const { id: isAdmin } = getUserIdRole();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const fileInputRef = useRef(null); // Create a ref

  const { data: documents, isLoading: isFetchingDocuments } =
    useGetAllDocuments(userId);
  console.log("documents", documents);

  const { deleteDocument, isPending: isDeletingDocument } = useDeleteDocument();
  const { addDocument, isPending: isAddingDocument } = useAddDocuments();
  const { updateDocuments, isPending: isUpdatingDocument } =
    useUpdateDocument();

  const [newDocumentTitle, setNewDocumentTitle] = useState("");
  const [newDocumentFile, setNewDocumentFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [loadingDocumentId, setLoadingDocumentId] = useState(null);

  const handleFileChange = (e) => {
    setNewDocumentFile(e.target.files[0]);
  };

  const handleAddDocument = () => {
    if (!newDocumentTitle || !newDocumentFile) return;

    const formData = new FormData();
    formData.append("title", newDocumentTitle);
    formData.append("file", newDocumentFile);

    addDocument({ data: formData, userId });
    setIsAddModalVisible(false);
    setNewDocumentTitle("");
    setNewDocumentFile(null);
  };

  const handleDeleteDocument = (docId) => {
    setLoadingDocumentId(docId);
    deleteDocument({ userId, documentId: docId });
  };

  const handleUpdateDocument = () => {
    if (!newDocumentTitle || !newDocumentFile) return;

    const formData = new FormData();
    formData.append("title", newDocumentTitle);
    formData.append("file", newDocumentFile);

    setLoadingDocumentId(currentDocumentId);

    updateDocuments({ data: formData, documentId: currentDocumentId });
    setIsUpdateModalVisible(false);
  };

  const handlePreview = (imageURL, isPDF) => {
    setPreviewFile({ url: imageURL, isPDF });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setPreviewFile(null);
  };


const showAddModal = () => {
  setNewDocumentTitle("");  // Reset title
  setNewDocumentFile(null); // Reset file
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // Reset file input field
  }
  setIsAddModalVisible(true);
};

  const showUpdateModal = (docId, title) => {
    setCurrentDocumentId(docId);
    setNewDocumentTitle(title); // Set the selected document title
    setIsUpdateModalVisible(true);
  };

  const isPDF = (imageURL) => imageURL.toLowerCase().endsWith(".pdf");

  // Columns for Ant Table
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
    {
      title: "Actions",
      key: "actions",
      render: (_, doc) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => showUpdateModal(doc.key, doc.title)} // Pass title as well
              className="bg-gray-900 text-white hover:bg-gray-900"
            >
              {loadingDocumentId === doc.key && isUpdatingDocument ? (
                <Spin />
              ) : (
                <FaEdit />
              )}
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() => handleDeleteDocument(doc.key)}
              className="bg-gray-900 text-white hover:bg-gray-900"
            >
              {loadingDocumentId === doc.key && isDeletingDocument ? (
                <Spin />
              ) : (
                <MdDelete />
              )}
            </Button>
          </Tooltip>
        </Space>
      ),
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
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Available Documents
      </h2>

      {isAdmin && (
        <div className="flex justify-center m-2">
          <Button type="primary" onClick={showAddModal}>
            {isAddingDocument ? "Adding..." : "Add Document"}
          </Button>
        </div>
      )}

      {isFetchingDocuments ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}

      {/* Add Document Modal */}
      <Modal
        title="Add New Document"
        visible={isAddModalVisible}
        onOk={handleAddDocument}
        onCancel={() => setIsAddModalVisible(false)}
        confirmLoading={isAddingDocument}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Document Title">
            <Input
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Enter document title"
            />
          </Form.Item>
          <Form.Item label="Upload New Document">
            <input
              type="file"
              ref={fileInputRef} // Attach the ref
              onChange={handleFileChange}
              className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Document Modal */}
      <Modal
        title="Update Document"
        visible={isUpdateModalVisible}
        onOk={handleUpdateDocument}
        onCancel={() => setIsUpdateModalVisible(false)}
        confirmLoading={isUpdatingDocument}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Document Title">
            <Input
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Enter new document title"
            />
          </Form.Item>
          <Form.Item label="Upload New Document">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Document Preview Modal */}
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

export default Documents;