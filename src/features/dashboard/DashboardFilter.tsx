// DashboardFilter.tsx
import { useSearchParams } from "react-router-dom";

const options = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("last") || "7";

  function handleChange(value: string) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleChange(opt.value)}
          className={`p-2 rounded-md text-sm ${
            current === opt.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default DashboardFilter;
