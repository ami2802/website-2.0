import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWorkPeriod(startDate: Date, endDate?: Date) {
  if (!endDate) {
    return formatToMMMYYYY(startDate) + " - Present";
  } else {
    return formatToMMMYYYY(startDate) + " - " + formatToMMMYYYY(endDate);
  }
}

export function formatToMMM(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short" });
}

export function formatToMMMYYYY(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function formatFromMMMYYYY(dateString: string): Date {
  const [monthStr, yearStr] = dateString.split(" ");
  const months: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const monthIndex = months[monthStr];
  const year = parseInt(yearStr);
  return new Date(year, monthIndex, 1);
}

export function monthsBetween(start: Date, end?: Date): string {
  const endDate = end ?? new Date();

  let totalMonths =
    (endDate.getFullYear() - start.getFullYear()) * 12 +
    (endDate.getMonth() - start.getMonth()) +
    1;

  if (totalMonths < 0) totalMonths = 0;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0 && months === 0) {
    return "";
  }

  const yearStr = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthStr =
    months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";

  return yearStr && monthStr ? `${yearStr} ${monthStr}` : yearStr || monthStr;
}
