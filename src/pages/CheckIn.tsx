import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "../features/bookings/hooks/useBooking";
import { HiArrowDownLeft, HiHomeModern } from "react-icons/hi2";
import { useBookingSummary } from "../features/bookings/hooks/useBookingSummary";
import { useDeleteBooking } from "../features/bookings/hooks/useDeleteCabin";
import { useEffect, useState } from "react";
import { useUpdateBooking } from "../features/bookings/hooks/useUpdateBooking";
import { toast } from "react-toastify";

function CheckIn() {
  const { bookingId } = useParams();
  const id = Number(bookingId);
  const navigate = useNavigate();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();

  const { data: booking, isPending, error } = useBooking(id);
  const { stay, range } = useBookingSummary(
    booking?.start_date ?? null,
    booking?.end_date ?? null,
  );

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    if (!booking) return;
    setConfirmPaid(booking.is_paid ?? false);
    setAddBreakfast(booking.has_breakfast ?? false);
  }, [booking]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Failed to load booking</p>;
  if (!booking) return null;

  const basePrice = booking.total_price ?? 0;
  const alreadyPaid = booking.is_paid ?? false;
  const alreadyHasBreakfast = booking.has_breakfast ?? false;

  const finalPrice =
    basePrice + (!alreadyHasBreakfast && addBreakfast ? 500 : 0);

  const isPaidFinal = alreadyPaid || confirmPaid;

  const handleCheckIn = () => {
    updateBooking(
      {
        id: booking.id,
        updates: {
          status: "checked-in",
          is_paid: isPaidFinal,
          has_breakfast: addBreakfast,
          total_price: finalPrice,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Booking #${booking.id} successfully checked in ✅`);
          navigate(-1);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-5 text-gray-800 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Booking #{booking.id}</h2>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 bg-white px-3 py-2 rounded hover:bg-indigo-600 hover:text-white"
        >
          <HiArrowDownLeft /> Back
        </button>
      </div>

      <div className="rounded-xl overflow-hidden shadow">
        <div className="bg-gray-400 p-6 flex justify-between">
          <div className="flex items-center gap-3 text-xl">
            <HiHomeModern />
            {booking.num_nights} nights in cabin {booking.cabins?.name}
          </div>
          <div className="text-right">
            <p className="font-medium">{stay}</p>
            <p>{range}</p>
          </div>
        </div>

        <div className="bg-white p-6 flex flex-col gap-4">
          <p>
            <strong>{booking.guests?.name}</strong> • {booking.num_guests}{" "}
            guests
          </p>
          <p>{booking.guests?.email}</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 flex flex-col gap-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={confirmPaid}
            disabled={alreadyPaid}
            onChange={(e) => setConfirmPaid(e.target.checked)}
            className="accent-indigo-600"
          />
          <span>I confirm that {booking.guests?.name} has paid</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={addBreakfast}
            disabled={alreadyHasBreakfast}
            onChange={(e) => setAddBreakfast(e.target.checked)}
            className="accent-indigo-600"
          />
          <span>
            Add breakfast for <strong>₹500</strong>
          </span>
        </label>

        <div className="flex justify-between border-t pt-4 font-medium">
          <span>Final price</span>
          <span>₹{finalPrice}</span>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          disabled={!isPaidFinal}
          onClick={handleCheckIn}
          className={`px-5 py-2 rounded text-white ${
            isPaidFinal
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUpdating ? "Checking in..." : "Check in"}
        </button>

        <button
          onClick={() => {
            deleteBooking(booking.id);
            navigate("/bookings");
          }}
          className="bg-red-600 px-5 py-2 rounded text-white hover:bg-red-700"
        >
          Delete booking
        </button>
      </div>
    </div>
  );
}

export default CheckIn;
