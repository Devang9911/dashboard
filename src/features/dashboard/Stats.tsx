import {
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineArrowRightOnRectangle,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import StatBox from "./StatBox";
import { useBookingStats } from "./hook/useBookingStats";
import ContainerSpinner from "../../components/ui/ContainerSpinner";
import { useCabins } from "../cabin/hooks/useCabins";
import { useOccupancyRate } from "./hook/useOccupancyRate";

function Stats() {
  const { stats, isPending, numDays } = useBookingStats();
  const { data , isPending : isloadingCabin } = useCabins();
  const cabinCount = data?.length;

  // 1
  const numBookinks = stats?.allBookings.length ?? 0;

  // 2
  const sales =
    stats?.allBookings.reduce((acc, cur) => acc + (cur.total_price ?? 0), 0) ??
    0;

  // 3
  const checkIns =
    stats?.allBookings.filter((b) => b.status === "checked-in").length ?? 0;

  // 4
  const occupancyRate = useOccupancyRate({
  bookings: stats?.allConfirmedBookings ?? [],
  numDays,
  cabinCount: cabinCount ?? 0,
});



  if (isPending && isloadingCabin) return <ContainerSpinner />;

  return (
    <div className="flex flex-wrap gap-4">
      {/* Booking */}
      <StatBox
        title="Bookings"
        value={numBookinks}
        icon={<HiOutlineCalendarDays />}
        color="bg-blue-100 text-blue-600"
      />

      {/* Sales */}
      <StatBox
        title="Sales"
        value={sales}
        icon={<HiOutlineCurrencyDollar />}
        color="bg-green-100 text-green-600"
      />

      {/* Check-ins */}
      <StatBox
        title="Check-ins"
        value={checkIns}
        icon={<HiOutlineArrowRightOnRectangle />}
        color="bg-purple-100 text-purple-600"
      />

      {/* Occupancy */}
      <StatBox
        title="Occupancy Rate"
        value={occupancyRate}
        icon={<HiOutlineHomeModern />}
        color="bg-orange-100 text-orange-600"
      />
    </div>
  );
}

export default Stats;
