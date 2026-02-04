import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword } from "../../services/apiLogin";

export function useUpdatePassword() {
  return useMutation({
    mutationFn: ({ password }: { password: string }) =>
      updatePassword(password),
    onSuccess: () => {
      toast.success("Password updated successfully 🔐");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update password ❌");
    },
  });
}
