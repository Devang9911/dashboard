function NoBooking() {
  return (
    <tr>
      <td colSpan={6} className="py-16 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg
            className="w-12 h-12 text-red-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg md:text-xl font-semibold text-red-600">
            No bookings found
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            Once you add bookings, they will appear here.
          </p>
        </div>
      </td>
    </tr>
  );
}

export default NoBooking;
