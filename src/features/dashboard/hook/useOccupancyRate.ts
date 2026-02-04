import { useMemo } from "react";

type Booking = {
  num_nights?: number | null;
  start_date?: string | null;
  end_date?: string | null;
};

type UseOccupancyRateProps = {
  bookings: Booking[];
  numDays: number;
  cabinCount: number;
};

export function useOccupancyRate({
  bookings,
  numDays,
  cabinCount,
}: UseOccupancyRateProps) {
  const occupancyRate = useMemo(() => {
    if (!bookings.length || numDays <= 0 || cabinCount <= 0) return 0;

    const totalBookedNights = bookings.reduce((acc, b) => {
      if (b.num_nights != null) return acc + b.num_nights;

      if (b.start_date && b.end_date) {
        const nights =
          (new Date(b.end_date).getTime() -
            new Date(b.start_date).getTime()) /
          (1000 * 60 * 60 * 24);

        return acc + Math.max(nights, 0);
      }

      return acc;
    }, 0);

    return Math.round((totalBookedNights / (numDays * cabinCount)) * 100);
  }, [bookings, numDays, cabinCount]);

  return occupancyRate;
}
