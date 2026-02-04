import ErrorLoadCabin from "./components/ErrorLoadCabin";
import CabinLoading from "./components/CabinLoading";
import { useCabins } from "./hooks/useCabins";
import CabinRow from "./CabinRow";
import { useState } from "react";
import Modal from "../../components/ui/Model";
import CabinForm from "../cabin/CabinForm";
import type { Cabin } from "./CabinTypes";
import { useSearchParams } from "react-router-dom";
import NoCabin from "./components/NoCabin";

function CabinTable() {
  const {
    data: cabins,
    isPending: isDataLoading,
    isError: isDataLoadingError,
  } = useCabins();
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get("discount") || "all";
  const [openForm, setOpenForm] = useState(false);
  const [editCabin, setEditCabin] = useState<Cabin | null>(null);

  let filteredCabin: Cabin[] = [];
  if (filterValue === "all") filteredCabin = cabins ?? [];
  if (filterValue === "no-discount")
    filteredCabin =
      cabins?.filter((cabin) => (cabin.discount ?? 0) === 0) ?? [];
  if (filterValue === "with-discount")
    filteredCabin = cabins?.filter((cabin) => (cabin.discount ?? 0) > 0) ?? [];

  // sort
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-") as [keyof Cabin, "asc" | "desc"];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = [...filteredCabin].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * modifier;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return 0;
  });

  return (
    <>
      <table className="w-full text-sm lg:table-fixed border-collapse bg-white shadow-sm">
        {/* TABLE HEADER */}
        <thead className="top-0 z-10 bg-gray-400 text-gray-900">
          <tr>
            <th className="px-2 md:px-4 py-3 w-32"></th>
            <th className="px-2 md:px-4 py-3 w-32 text-left font-semibold">
              Cabin
            </th>
            <th className="px-2 md:px-4 py-3 w-32 text-left font-semibold">
              Capacity
            </th>
            <th className="px-2 md:px-4 py-3 w-32 text-left font-semibold">
              Price
            </th>
            <th className="px-2 md:px-4 py-3 w-32 text-left font-semibold">
              Discount
            </th>
            <th className="px-2 md:px-4 py-3 w-16"></th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {cabins?.length === 0 && <NoCabin />}
          {isDataLoadingError && <ErrorLoadCabin />}

          {isDataLoading &&
            Array.from({ length: 4 }).map((_, i) => <CabinLoading key={i} />)}

          {sortedCabin?.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} onEdit={setEditCabin} />
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setEditCabin(null);
          setOpenForm(true);
        }}
        className="rounded-md bg-indigo-600 px-4 py-3 text-sm text-white cursor-pointer hover:bg-indigo-700"
      >
        Add Cabin
      </button>

      {(openForm || editCabin) && (
        <Modal
          onClose={() => {
            setOpenForm(false);
            setEditCabin(null);
          }}
        >
          <CabinForm
            cabin={editCabin}
            onClose={() => {
              setOpenForm(false);
              setEditCabin(null);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinTable;
