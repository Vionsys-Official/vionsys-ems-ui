import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocumentApi } from "../../services/documentsApi";
import { message } from "antd";

const useUpdateDocument = () => {
    const queryClient = useQueryClient();
    
    const { mutate: updateDocuments, isPending } = useMutation({
        mutationFn: ({ data, documentId }) => updateDocumentApi(data, documentId),
        
        onSuccess: (res) => {
            message.success(res.message || "Document updated successfully!");
            // Invalidate and refetch the documents query
            queryClient.invalidateQueries(['getAllDocuments']);
            queryClient.refetchQueries(['getAllDocuments']);
        },
        onError: (err) => {
            message.error(err.response?.data?.error || "Failed to update document.");
        },
    });

    return {
        updateDocuments,
        isPending,
    };
};

export default useUpdateDocument;
