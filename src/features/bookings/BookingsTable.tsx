import BookingsRow from "./BookingsRow";
import BookingsLoading from "./components/BookingsLoading";
import ErrorLoadBookings from "./components/ErrorLoadBookings";
import NoBooking from "./components/NoBooking";
import { useBookings } from "./hooks/useBookings";

function BookingsTable() {
  const {
    data,
    isPending,
    isError,
  } = useBookings();

  const bookings = data?.bookings ?? [];

  return (
    <table className="w-full text-sm table-fixed border-collapse">
      <thead className="sticky top-0 z-10 bg-gray-400 text-gray-900">
        <tr>
          <th className="px-2 md:px-4 py-3 w-15">Cabin</th>
          <th className="px-2 md:px-4 py-3 w-50 text-center">Guest</th>
          <th className="px-2 md:px-4 py-3 w-50 text-center">Dates</th>
          <th className="px-2 md:px-4 py-3 w-40 text-center">Status</th>
          <th className="px-2 md:px-4 py-3 w-40 text-center">Amount</th>
          <th className="px-2 md:px-4 py-3 w-16"></th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {isError && <ErrorLoadBookings />}

        {isPending &&
          Array.from({ length: 10 }).map((_, i) => (
            <BookingsLoading key={i} />
          ))}

        {!isPending && bookings.length === 0 && <NoBooking />}

        {!isPending &&
          bookings.map((booking) => (
            <BookingsRow key={booking.id} booking={booking} />
          ))}
      </tbody>
    </table>
  );
}

export default BookingsTable;
