import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import { toast } from "react-toastify";

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      
    },
    onError: (err: Error) => {
      toast.error(err.message || "Checkout failed ❌");
    },
  });
}
