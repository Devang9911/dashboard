import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.removeQueries();
      toast.success("Logged out successfully ✅");
      navigate("/login", { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
