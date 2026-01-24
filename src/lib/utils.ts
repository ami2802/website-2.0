import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWorkPeriod(startDate: Date, endDate?: Date) {
  if (!endDate) {
    return formatToMMMYYYY(startDate) + " - present";
  } else if (startDate.getFullYear() == endDate.getFullYear()) {
    return formatToMMM(startDate) + " - " + formatToMMMYYYY(endDate);
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
  return new Date(Date.parse(dateString + " 01"));
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
