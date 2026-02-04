import { useSearchParams } from "react-router-dom";

type SortByOption = {
  value: string;
  label: string;
};

type SortByProps = {
  value: string;
  options: SortByOption[];
  onChange: (value: string) => void;
};

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <select
      value={sortBy}
      onChange={handleChange}
      className="shadow rounded px-3 py-2 text-sm bg-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
