import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWelcomeKit } from "../../services/joiningKitApi";
import toast from "react-hot-toast";
const useUpdateWelcomeKit = () => {
    const queryClient = useQueryClient();
    const { mutate: returnKit, isPending: kitReturnPending } = useMutation({
        mutationFn: (kitId) => updateWelcomeKit(kitId),
        onSuccess: () => {
            toast.success('Accessory Returned!!');
            queryClient.invalidateQueries(["getKitDetails"]);
        }
    });
    return { returnKit, kitReturnPending };
};

export default useUpdateWelcomeKit;