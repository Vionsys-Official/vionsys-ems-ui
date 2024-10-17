import { useQuery } from '@tanstack/react-query';
import { getAllDocumentsbyId } from '../../services/documentsApi'; // Correct import

const useGetAllDocuments = (userId) => {
  return useQuery({
    queryKey: ['getAllDocuments', userId],
    queryFn: () => getAllDocumentsbyId(userId),
    enabled: !!userId, // Only run the query if userId is available
  });
};

export default useGetAllDocuments;
