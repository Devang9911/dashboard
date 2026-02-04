
function ErrorLoadCabin() {
  return (
    <tr>
      <td colSpan={6} className="py-10 text-center text-red-600">
        Failed to load cabins
      </td>
    </tr>
  );
}

export default ErrorLoadCabin;
