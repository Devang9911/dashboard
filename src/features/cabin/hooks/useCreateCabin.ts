import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../../services/apiCabins";
import type { NewCabin } from "../CabinTypes";
import { toast } from "react-toastify";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewCabin) => createCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError : (error)=> toast.error(error.message)
  });
}
