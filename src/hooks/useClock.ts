import { useState, useEffect, useMemo } from "react";
import type { ClockState } from "../types/clock.types";

export type { ClockState };

export function useClock(timezone?: string, locale?: string): ClockState {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    const tz = timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

    const parts = Intl.DateTimeFormat(locale ?? "en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: false,
    }).formatToParts(now);

    const get = (type: string) =>
      parts.find((p) => p.type === type)?.value ?? "";

    const rawHour = get("hour");

    return {
      hours: rawHour === "24" ? "00" : rawHour,
      minutes: get("minute"),
      seconds: get("second"),
      day: Number(get("day")),
      dayName: get("weekday"),
      monthName: get("month"),
      year: Number(get("year")),
    };
  }, [now, timezone, locale]);
}
