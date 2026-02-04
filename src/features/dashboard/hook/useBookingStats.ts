// features/dashboard/useBookingStats.ts
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsData } from "../../../services/apiDashboard";

export function useBookingStats() {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const {
    isPending,
    data: stats,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", numDays],
    queryFn: () => getBookingsData(numDays),
  });

  return {
    isPending,
    error,
    stats,
    numDays
  };
}
