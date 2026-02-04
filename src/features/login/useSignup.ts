import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../services/apiLogin";
import { toast } from "react-toastify";

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success(
        "Account created successfully 🎉 Please verify your account",
      );
    },

    onError: (err: Error) => {
      if (err.message === "EMAIL_ALREADY_EXISTS") {
        toast.error("This email is already registered.");
        return;
      }

      toast.error("Signup failed. Please try again ❌");
    },
  });
}
