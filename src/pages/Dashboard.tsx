import DashboardFilter from "../features/dashboard/DashboardFilter";
import { useBookingStats } from "../features/dashboard/hook/useBookingStats";
import { useMonthlySales } from "../features/dashboard/hook/useMonthlySales";
import SalesChart from "../features/dashboard/SalesChart";
import Stats from "../features/dashboard/Stats";

type Booking = {
  id: number;
  start_date: string | null;
  end_date: string | null;
  total_price: number | null;
  status: string | null;
  created_at: string;
  num_nights: number | null;
};

function Dashboard() {
  const { stats } = useBookingStats();
  const monthlySales = useMonthlySales(
    (stats?.allBookings ?? []).filter((b): b is Booking => b.status !== null),
  );

  return (
    <div className="flex flex-col gap-6 text-gray-800 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <DashboardFilter />
      </div>
      <Stats />
        <SalesChart data={monthlySales} />
    </div>
  );
}

export default Dashboard;
