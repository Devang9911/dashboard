import { useMemo } from "react";

function getLast12Months() {
  const months: { key: string; label: string }[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    months.push({
      key,
      label: d.toLocaleString("default", { month: "short" }),
    });
  }

  return months;
}

type Booking = {
  total_price?: number | null;
  status: string | null;
  created_at: string;
};


export function useMonthlySales(bookings: Booking[]) {
  const data = useMemo(() => {
    const months = getLast12Months();

    // init map with 0
    const salesMap: Record<string, number> = {};
    months.forEach((m) => (salesMap[m.key] = 0));

    bookings
      .filter((b) => b.status === "checked-in" || b.status === "checked-out")
      .forEach((b) => {
        if (!b.created_at) return;

        const date = new Date(b.created_at);
        const key = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, "0")}`;

        if (salesMap[key] !== undefined) {
          salesMap[key] += b.total_price ?? 0;
        }
      });

    return months.map((m) => ({
      month: m.label,
      sales: salesMap[m.key],
    }));
  }, [bookings]);

  return data;
}
