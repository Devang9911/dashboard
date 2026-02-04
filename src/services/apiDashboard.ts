import { supabase } from "./supabase";

function getDateXDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

function getTodayEnd() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
}

export async function getBookingsData(days: number) {
  const startDate = getDateXDaysAgo(days);
  const endDate = getTodayEnd();

  const { data, error } = await supabase
    .from("bookings")
    .select("id, start_date, end_date, total_price, status, created_at , num_nights")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  if (error) throw new Error(error.message);

  const allBookings = data ?? [];

  const allConfirmedBookings = allBookings.filter(
    (b) => b.status === "checked-in" || b.status === "checked-out"
  );



  return {
    allBookings,
    allConfirmedBookings,
  };
}
