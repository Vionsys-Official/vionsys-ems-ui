import { useQuery } from '@tanstack/react-query';
import { getUsersBirthdayFromMonth as getUserBirthdayAPI } from '../../services/usersApi';
export const useGetBirthdaysFromMonth = () => {
    const { data: birthdays, isPending: isLoading } = useQuery({
        queryKey: ["users_birthday"],
        queryFn: () => getUserBirthdayAPI(),
        staleTime: 1000 * 60 * 60 * 24 * 30
    });
    return { birthdays, isLoading };
}
