import { api } from './authApi'; // Ensure api is set up with base URL etc.
const token = localStorage.getItem('token');

export const getAllDocumentsbyId = async (userId) => {
  try {
    const response = await api.get(`document/employees/documents/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the 'data' property where the documents are stored
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error; // Throw the error to handle it in the hook
  }
};

export const addDocumentApi = async (data, userId)=>{
  console.log(userId);
  const response = await api.post(`/document/employees/${userId}/documents`,data,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
  return response.data;
}

export const deleteDocumentApi = async (userId, documentId) => {
  try {
    const response = await api.delete(`/document/employees/${userId}/documents/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error; // Ensure error is thrown
  }
};

//Api call to updated documents 
export const updateDocumentApi = async (data, documentId) => {
  console.log(documentId);
  try {
    const response = await api.put(
      `/document/employees/documents/${documentId}`,
      data,  // Pass the FormData or other data here
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',  // Set appropriate content type for FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error updating document");
  }
};
