import { useMutation, useQueryClient } from "@tanstack/react-query";
import {addDocumentApi} from "../../services/documentsApi";
import toast from "react-hot-toast";

const useAddDocuments = () => {
    const queryClient = useQueryClient();
  
    const { mutate: addDocument, isPending } = useMutation({
      mutationFn: ({ data, userId }) => addDocumentApi(data, userId), // Ensure the userId is passed properly here
      onSuccess: (res) => {
        toast.success(res.message || "Document added successfully!");
        queryClient.invalidateQueries({ queryKey: ["getAllDocuments"] });
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || "Failed to add document.");
      },
    });

    return {
      addDocument,
      isPending,
    };
  };
  
export default useAddDocuments;