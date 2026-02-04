import type { Database } from "../../services/database.types";

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Guest = Database["public"]["Tables"]["guests"]["Row"];

export type BookingWithRelations = Booking & {
  cabins: Pick<Cabin, "name"> | null;       // cabin name
  guests: Pick<Guest, "name" | "email"> | null; // guest name & email
};