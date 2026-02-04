import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../../services/apiCabins";
import { toast } from "react-toastify";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully ✅")
    },
    onError : (error)=> {
      if(error.message.includes("violates foreign key constraint")){
        toast.error("Cannot delete cabin: there are existing bookings 🛑")
      }else{
        toast.error(error.message)
      }
    }
  });
}
