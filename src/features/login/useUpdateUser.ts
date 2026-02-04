import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiLogin";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserData,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("User updated successfully ✅");
      console.log(data)
    },

    onError: (err: Error) => {
      toast.error(err.message || "Failed to update user ❌");
    },
  });
}
