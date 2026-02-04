import CabinActions from "./CabinActions";
import type { Cabin } from "./CabinTypes";

type Props = {
  cabin: Cabin;
  onEdit: (cabin: Cabin) => void;
};

function CabinRow({ cabin, onEdit }: Props) {
  return (
    <tr className="relative shadow-md">
      <td className="p-3">
        <img
          src={
            cabin.image ||
            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
          }
          alt={cabin.name || ""}
          className="w-40 rounded-md hidden md:flex"
        />
      </td>

      <td className="px-2 md:px-4 py-3 font-medium">{cabin.name}</td>
      <td className="px-2 md:px-4 py-3">{cabin.max_capacity}</td>
      <td className="px-2 md:px-4 py-3">₹{cabin.regular_price}</td>
      <td className="px-2 md:px-4 py-3 text-green-600">
        {cabin.discount && cabin.discount > 0 ? `₹${cabin.discount}` : "–"}
      </td>

      <CabinActions cabin={cabin} onEdit={onEdit} />
    </tr>
  );
}

export default CabinRow;
