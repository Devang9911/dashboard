import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import CabinTable from "../features/cabin/CabinTable";
import SortBy from "../components/ui/SortBy";
import { useState } from "react";
import { useCabins } from "../features/cabin/hooks/useCabins";

function Cabins() {
  const { data: cabins } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("name-asc");
  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("discount", value);
    setSearchParams(params);
  };
  const activeDiscount = searchParams.get("discount") ?? "all";

  return (
    <>
      <div className="min-h-screen flex flex-col gap-6 text-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h2 className="text-3xl font-semibold">All Cabins</h2>
          {cabins?.length !== 0 && (
            <div className="flex gap-3">
              <div className="flex gap-5">
                <Button
                  onClick={() => handleClick("all")}
                  className={
                    activeDiscount === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }
                >
                  All
                </Button>

                <Button
                  onClick={() => handleClick("no-discount")}
                  className={
                    activeDiscount === "no-discount"
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }
                >
                  No discount
                </Button>

                <Button
                  onClick={() => handleClick("with-discount")}
                  className={
                    activeDiscount === "with-discount"
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }
                >
                  With discount
                </Button>
              </div>
              <div>
                <SortBy
                  value={sortBy}
                  onChange={setSortBy}
                  options={[
                    { value: "name-asc", label: "Sort by name (A-Z)" },
                    { value: "name-desc", label: "Sort by name (Z-A)" },
                    {
                      value: "regular_price-asc",
                      label: "Sort by price (low to high)",
                    },
                    {
                      value: "regular_price-desc",
                      label: "Sort by price (high to low)",
                    },
                    {
                      value: "max_capacity-asc",
                      label: "Sort by capacity (low to high)",
                    },
                    {
                      value: "max_capacity-desc",
                      label: "Sort by capacity (high to low)",
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex flex-col gap-5 items-start">
          <CabinTable />
        </div>
      </div>
    </>
  );
}

export default Cabins;
