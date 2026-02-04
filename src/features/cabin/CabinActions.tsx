import { useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import type { Cabin } from "./CabinTypes";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useDuplicateCabin } from "./hooks/useDuplicateCabin";
import { toast } from "react-toastify";

type Props = {
  cabin: Cabin;
  onEdit: (cabin: Cabin) => void;
};

function CabinActions({ cabin, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteCabin } = useDeleteCabin();
  const { duplicateCabin } = useDuplicateCabin();
  const menuRef = useRef<HTMLDivElement | null>(null);

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
    <td className="px-2 md:px-4 py-3 text-right relative">
      <div ref={menuRef} className=" inline-block">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          <HiEllipsisVertical className="h-5 w-5" />
        </button>

        {open && (
          <div className="absolute right-15 bottom-3 w-25 bg-white shadow-lg z-10">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-300"
              onClick={() => {
                duplicateCabin(cabin, {
                  onSuccess: () => toast.success("Cabin duplicated 🎉"),
                  onError: () => toast.error("Failed to duplicate cabin"),
                });
                setOpen(false);
              }}
            >
              Duplicate
            </button>

            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-300"
              onClick={() => {
                onEdit(cabin);
                setOpen(false);
              }}
            >
              Edit
            </button>

            <button
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-300 disabled:opacity-50"
              onClick={() => {
                deleteCabin(cabin.id);
                setOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </td>
  );
}

export default CabinActions;
