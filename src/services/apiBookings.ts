import type { Database } from "./database.types";
import { supabase } from "./supabase";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

type BookingWithRelations = Booking & {
  cabins: Pick<Cabin, "name">; // cabin name
  guests: Pick<Guest, "name" | "email">; // guest name & email
};

type GetBookingsParams = {
  page: number;
  pageSize: number;
  status?: string;
  sortBy?: string;
};

// -------------------------------------------------------booking with filtering , sorting and pagination
export async function getBookings({
  page,
  pageSize,
  status,
  sortBy,
}: GetBookingsParams) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(name, email)", {
      count: "exact",
    });

  // filter
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  // sort
  if (sortBy) {
    const [field, direction] = sortBy.split("-");
    query = query.order(field, { ascending: direction === "asc" });
  }

  // pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  return {
    bookings: data ?? [],
    count: count ?? 0,
  };
}

// -------------------------------------------------------delete
export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

// -------------------------------------------------------booking by id
export async function getBookingById(
  bookingId: number,
): Promise<BookingWithRelations> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(name, email)")
    .eq("id", bookingId)
    .single(); // 👈 ensures one row

  if (error) {
    throw new Error(error.message);
  }

  return data as BookingWithRelations;
}

type UpdateBookingParams = {
  id: number;
  updates: {
    status?: "unconfirmed" | "checked-in" | "checked-out";
    is_paid?: boolean | null;
    has_breakfast?: boolean | null;
    total_price?: number | null;
  };
};

export async function updateBooking({
  id,
  updates,
}: UpdateBookingParams): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }
}

// -------------------------------------------------booking data for dashboard filtering
