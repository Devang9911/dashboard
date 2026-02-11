import { useEffect, useState } from "react";
import { useSettings, useUpdateSettings } from "../features/settings/useSettings";

function Settings() {
  const { data: settings, isLoading } = useSettings();
  const { mutate, isPending } = useUpdateSettings();

  const [formData, setFormData] = useState({
    min_booking_length: 0,
    max_booking_length: 0,
    max_guest_per_booking: 0,
    breakfast_price: 0,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        min_booking_length: settings.min_booking_length ?? 0,
        max_booking_length: settings.max_booking_length ?? 0,
        max_guest_per_booking: settings.max_guest_per_booking ?? 0,
        breakfast_price: settings.breakfast_price ?? 0,
      });
    }
  }, [settings]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(formData);
  }

  if (isLoading) return <p>Loading settings...</p>;

  return (
    <div className="flex flex-col gap-6 text-gray-800 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold">Update hotel settings</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded bg-white flex flex-col gap-6 px-6 py-7 shadow"
      >
        {/* Minimum Nights */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">
            Minimum nights/booking
          </label>

          <input
            type="number"
            name="min_booking_length"
            value={formData.min_booking_length}
            onChange={handleChange}
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Maximum Nights */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">
            Maximum nights/booking
          </label>

          <input
            type="number"
            name="max_booking_length"
            value={formData.max_booking_length}
            onChange={handleChange}
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Maximum Guests */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">
            Maximum guests/booking
          </label>

          <input
            type="number"
            name="max_guest_per_booking"
            value={formData.max_guest_per_booking}
            onChange={handleChange}
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Breakfast Price */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">
            Breakfast price
          </label>

          <input
            type="number"
            name="breakfast_price"
            value={formData.breakfast_price}
            onChange={handleChange}
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Button */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6">
          <div />
          <button
            type="submit"
            disabled={isPending}
            className="w-fit px-6 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition disabled:opacity-50"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
          <div />
        </div>
      </form>
    </div>
  );
}

export default Settings;
