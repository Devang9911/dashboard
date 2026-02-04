import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../features/bookings/hooks/useBooking";
import {
  HiArrowDownLeft,
  HiBookmark,
  HiChevronRight,
  HiHomeModern,
} from "react-icons/hi2";
import { useBookingSummary } from "../features/bookings/hooks/useBookingSummary";
import { useDeleteBooking } from "../features/bookings/hooks/useDeleteCabin";
type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";
const statusStyles: Record<BookingStatus, string> = {
  unconfirmed: "bg-blue-100 text-blue-700",
  "checked-in": "bg-green-100 text-green-700",
  "checked-out": "bg-gray-100 text-gray-600",
};
function formatStatus(status: BookingStatus) {
  if (!status) return " ";
  return status.replace("", " ");
}

function BookingDetails() {
  const { bookingId } = useParams();
  const id = Number(bookingId);
  const navigate = useNavigate();   
  const { mutate: deleteBooking } = useDeleteBooking();

  const { data: booking, isPending, error } = useBooking(id);
  const { stay, range } = useBookingSummary(
    booking?.start_date ?? null,
    booking?.end_date ?? null,
  );

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Failed to load booking</p>;
  if (!booking) return null;

  return (
    <div className="flex flex-col gap-5 text-gray-800 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-3xl font-semibold">Booking #{booking.id}</h2>

          <span
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              statusStyles[booking.status as BookingStatus]
            }`}
          >
            {formatStatus(booking.status as BookingStatus)}
          </span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm hover:bg-indigo-600 hover:text-white transition"
        >
          <HiArrowDownLeft />
          Back
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-400 text-black p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 text-xl font-medium">
            <HiHomeModern className="text-2xl" />
            {booking.num_nights} nights in cabin {booking.cabins?.name}
          </div>

          <div className="text-sm md:text-right">
            <p className="font-medium">{stay}</p>
            <p className="opacity-90">{range}</p>
          </div>
        </div>

        <div className="bg-white p-6 flex flex-col gap-5">
          <div className="flex flex-wrap gap-3 text-md text-gray-700">
            <span className="font-medium">{booking.guests?.name}</span>
            <span>• {booking.num_guests} guests</span>
            <span>• {booking.guests?.email}</span>
          </div>

          <div className="flex items-start gap-3 text-md">
            <HiBookmark className="mt-1 text-gray-500" />
            <span>
              <span className="font-medium">Observations:</span>{" "}
              {booking.observations ?? "No observations"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-md">
            <HiChevronRight className="text-gray-500" />
            <span>
              <span className="font-medium">Breakfast included:</span>{" "}
              {booking.has_breakfast ? "Yes" : "No"}
            </span>
          </div>

          <div
            className={`flex items-center justify-between rounded-lg p-5 text-md ${
              booking.is_paid
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            <span className="font-medium">
              Total price: ₹{booking.total_price}
            </span>
            <span className="uppercase font-semibold">
              {booking.is_paid ? "Paid" : "Pay at property"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {booking.status === "checked-in" && (
          <button className="rounded-md bg-indigo-600 px-5 py-2 text-white text-md hover:bg-indigo-700 transition">
            Check out
          </button>
        )}
        {booking.status === "unconfirmed" && (
          <button className="rounded-md bg-indigo-600 px-5 py-2 text-white text-md hover:bg-indigo-700 transition" onClick={()=> navigate(`/checkin/${booking.id}`)}>
            Check in
          </button>
        )}

        <button
          className="rounded-md bg-red-600 px-5 py-2 text-white text-md hover:bg-red-700 transition"
          onClick={() => {
            deleteBooking(booking.id);
            navigate("/bookings");
          }}
        >
          Delete booking
        </button>
      </div>
    </div>
  );
}

export default BookingDetails;
