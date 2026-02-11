import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../../services/apiSettings";
import { toast } from "react-toastify";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      toast.success("Settings updated successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Update failed ❌");
    },
  });
}
