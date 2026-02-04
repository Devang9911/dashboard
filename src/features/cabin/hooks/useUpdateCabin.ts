import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../../services/apiCabins";
import type { NewCabin } from "../CabinTypes";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: NewCabin }) =>
      updateCabin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
}
