// features/auth/hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiLogin";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Logged in successfully ✅");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Invalid email or password ❌");
    },
  });
}
