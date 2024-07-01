import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKit as AddJoiningKitApi } from "../../services/joiningKitApi";
import toast from "react-hot-toast";
const useAddKit = () => {
    const queryClient = useQueryClient();
    const { mutate: addKit, isPending: addKitPending } = useMutation({
        mutationKey: ["welcomeKit"],
        mutationFn: (values) => AddJoiningKitApi(values),
        onSuccess: () => {
            toast.success('WelcomeKit added successfully!!');
            queryClient.invalidateQueries(["getKitDetails"]);
        },
        onError: (err) => {
            console.log(err);
            toast.error(err.response.data.error);
        },
    });
    return { addKit, addKitPending };
};

export default useAddKit;