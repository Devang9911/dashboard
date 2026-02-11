function Settings() {
  return (
    <div className="flex flex-col gap-6 text-gray-800 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-semibold">Update hotel settings</h2>
      </div>
      <form className="w-full rounded bg-white flex flex-col gap-6 px-6 py-7 shadow">
        {/* Full Name */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Minimum nights/booking</label>

          <input
            type="number"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-sm text-red-500">{/* error */}</p>
        </div>

        {/* Email */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Maximum nights/booking</label>

          <input
            type="number"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-sm text-red-500">{/* error */}</p>
        </div>

        {/* Password */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">Maximum guests/booking</label>

          <input
            type="number"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-sm text-red-500">{/* error */}</p>
        </div>

        {/* Confirm Password */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6 items-center">
          <label className="text-md font-medium text-gray-700">
            Breakfast price
          </label>

          <input
            type="number"
            className="w-full bg-white p-2 shadow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-sm text-red-500">{/* error */}</p>
        </div>

        {/* Button */}
        <div className="grid grid-cols-[180px_1fr_1fr] gap-6">
          <div />
          <button
            type="submit"
            className="w-fit px-6 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition"
          >
            Update
          </button>
          <div />
        </div>
      </form>
    </div>
  );
}

export default Settings;
