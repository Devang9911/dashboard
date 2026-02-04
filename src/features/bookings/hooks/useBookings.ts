import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../../services/apiBookings";

const PAGE_SIZE = 5;

export function useBookings() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "start_date-desc";

  return useQuery({
    queryKey: ["bookings", page, status, sortBy],
    queryFn: () =>
      getBookings({
        page,
        pageSize: PAGE_SIZE,
        status,
        sortBy,
      }),
    placeholderData: (previousData) => previousData,
  });
}
