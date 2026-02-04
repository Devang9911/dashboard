import type { Cabin, NewCabin } from "../CabinTypes";
import { useCreateCabin } from "./useCreateCabin";

export function useDuplicateCabin() {
  const { mutate: createCabin } = useCreateCabin();

  function duplicateCabin(
    cabin: Cabin,
    options?: {
      onSuccess?: () => void;
      onError?: (error: unknown) => void;
    }
  ) {
    const { id, created_at, ...rest } = cabin;

    const payload: NewCabin = {
      ...rest,
      name: `Copy of ${cabin.name}`,
      image: cabin.image ?? null,
      imageFile: undefined, // no new file for duplication
    };

    createCabin(payload, {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    });
  }

  return { duplicateCabin };
}
