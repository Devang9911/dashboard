import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../../../services/apiBookings";
import type { BookingWithRelations } from "../BookingsTypes";

export function useBooking(bookingId?: number) {
  return useQuery<BookingWithRelations>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });
}
