import { useMemo } from "react";

function getRelativeTime(start: Date) {
  const diffDays = Math.floor(
    (start.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays > 0)
    return `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;

  const pastDays = Math.abs(diffDays);
  if (pastDays < 30) return `${pastDays} days ago`;
  if (pastDays < 365)
    return `${Math.floor(pastDays / 30)} months ago`;
  return `Over ${Math.floor(pastDays / 365)} years ago`;
}


export function useBookingSummary(
  startDate: string | null,
  endDate: string | null
) {
  return useMemo(() => {
    if (!startDate || !endDate) {
      return {
        relative: "—",
        stay: "—",
        range: "—",
        nights: 0,
      };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const nights = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const relative = getRelativeTime(start);

    const range = `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })} — ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })}`;

    const stay = `${nights} Night${nights !== 1 ? "s" : ""} stay`;

    return {
      relative,
      stay,
      range,
      nights,
    };
  }, [startDate, endDate]);
}
