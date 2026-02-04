import { useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import type { BookingWithRelations } from "./BookingsTypes";
import { useDeleteBooking } from "./hooks/useDeleteCabin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCheckOut } from "./hooks/useCheckOut";

function BookingActions({ booking }: { booking: BookingWithRelations }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
  const { mutate: checkoutBooking, isPending: isCheckingOut } = useCheckOut();

  const handleCheckout = () => {
    checkoutBooking(
      {
        id: booking.id,
        updates: {
          status: "checked-out",
        },
      },
      {
        onSuccess: () => {
          toast.success(
            `Guest ${booking.guests?.name} successfully checked out ✅`,
          );
        },
      },
    );
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <td className="px-2 md:px-4 py-3 text-right relative z-11">
      <div ref={menuRef} className=" inline-block">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          <HiEllipsisVertical className="h-5 w-5" />
        </button>

        {open && (
          <div className="absolute right-15 top-1 w-40 bg-gray-100 shadow-lg z-11">
            <button
              className="shadow w-full px-2 py-1 text-left hover:bg-gray-300"
              onClick={() => navigate(`/booking/${booking.id}`)}
            >
              See Details
            </button>
            {booking.status === "unconfirmed" && (
              <button
                className="shadow w-full px-2 py-1 text-left hover:bg-gray-300"
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check in
              </button>
            )}
            {booking.status === "checked-in" && (
              <button
                className="shadow w-full px-2 py-1 text-left hover:bg-gray-300"
                onClick={handleCheckout}
              >
                {isCheckingOut ? "Checking Out..." : "Check Out"}
              </button>
            )}

            <button
              className="shadow w-full px-2 py-1 text-left hover:bg-gray-300"
              onClick={() =>
                deleteBooking(booking.id, {
                  onSuccess: () => {
                    toast.success(`Booking #${booking.id} deleted ✅`);
                  },
                })
              }
            >
              {isDeleting ? "Deleting..." : "Delete Booking"}
            </button>
          </div>
        )}
      </div>
    </td>
  );
}

export default BookingActions;
