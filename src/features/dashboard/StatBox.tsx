type StatBoxProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
};

export default function StatBox({ title, value, icon, color }: StatBoxProps) {
  return (
    <div className="flex-1 min-w-55 rounded-xl bg-white p-4 shadow-sm ">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${color}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}{title === "Sales" ? "₹" : title === "Occupancy Rate" ? "%" : ""}</p>
        </div>
      </div>
    </div>
  );
}
