import Button from "../components/ui/Button";
import SortBy from "../components/ui/SortBy";
import BookingsTable from "../features/bookings/BookingsTable";
import { useBookings } from "../features/bookings/hooks/useBookings";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/ui/Pagination";

function Bookings() {
  const { data } = useBookings();

  const count = data?.count ?? 0;

  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "all";
  const sortBy = searchParams.get("sortBy") ?? "start_date-desc";

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="flex flex-col gap-6 text-gray-800 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold">All Bookings</h2>

        {count >= 0 && (
          <div className="flex gap-3">

            <div className="flex gap-5">
              {["all", "checked-out", "checked-in", "unconfirmed"].map(
                (value) => (
                  <Button
                    key={value}
                    onClick={() => setParam("status", value)}
                    className={
                      status === value
                        ? "bg-indigo-600 text-white"
                        : "bg-white"
                    }
                  >
                    {value === "all"
                      ? "All"
                      : value.replace("-", " ")}
                  </Button>
                )
              )}
            </div>

            <SortBy
              value={sortBy}
              onChange={(value) => setParam("sortBy", value)}
              options={[
                {
                  value: "start_date-desc",
                  label: "Sort by date (recent first)",
                },
                {
                  value: "start_date-asc",
                  label: "Sort by date (earlier first)",
                },
                {
                  value: "total_price-desc",
                  label: "Sort by amount (high first)",
                },
                {
                  value: "total_price-asc",
                  label: "Sort by amount (low first)",
                },
              ]}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-4 pb-5">
        <div className="flex overflow-y-auto rounded-md bg-white">
          <BookingsTable />
        </div>

        <Pagination count={count} />
      </div>
    </div>
  );
}

export default Bookings;
