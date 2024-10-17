import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocumentApi } from '../../services/documentsApi'; // Import the delete API function
import toast from 'react-hot-toast';

const useDeleteDocument = () => {
  const queryClient = useQueryClient(); // This allows us to refetch queries after deletion

  const { mutate: deleteDocument, isPending } = useMutation({
    mutationFn: ({ userId, documentId }) => deleteDocumentApi(userId, documentId),
    onSuccess: () => {
      toast.success('Document deleted successfully!');
      queryClient.invalidateQueries('getAllDocuments'); // Refetch the documents after deletion
    },
    onError: (error) => {
      toast.error('Failed to delete the document.');
      console.error(error);
    },
  });
  
  return { deleteDocument, isPending };
};

export default useDeleteDocument;
