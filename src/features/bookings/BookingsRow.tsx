import BookingActions from "./BookingsActions";
import type { BookingWithRelations } from "./BookingsTypes";
import { useBookingSummary } from "./hooks/useBookingSummary";

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";
const statusStyles: Record<BookingStatus, string> = {
  "unconfirmed": "bg-blue-100 text-blue-700",
  "checked-in": "bg-green-100 text-green-700",
  "checked-out": "bg-gray-100 text-gray-600",
};
function formatStatus(status: BookingStatus) {
  if(!status) return(" ")
  return status.replace("", " ");
}

function BookingsRow({ booking }: { booking: BookingWithRelations }) {
  const { relative, stay, range } = useBookingSummary(
    booking.start_date,
    booking.end_date,
  );
  return (
    <tr className="relative shadow-md">
      <td className="p-3 text-center">{booking.cabins?.name}</td>
      <td className="px-2 md:px-4 py-3 text-center flex flex-col">
        <span className="text-[15px]">{booking.guests?.name}</span>
        <span>{booking.guests?.email}</span>
      </td>
      <td className="px-2 md:px-4 py-3 text-center">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            {relative} {relative ? "→" : ""} {stay}
          </span>
          <span className="text-sm text-gray-500">{range}</span>
        </div>
      </td>

      <td className="px-2 md:px-4 py-3 text-center">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
            statusStyles[booking.status as BookingStatus]
          }`}
        >
          {formatStatus(booking.status as BookingStatus)}
        </span>
      </td>

      <td className="px-2 md:px-4 py-3 text-green-600 text-center">
        ₹{booking.total_price}
      </td>
      <BookingActions booking={booking}/>
    </tr>
  );
}

export default BookingsRow;
