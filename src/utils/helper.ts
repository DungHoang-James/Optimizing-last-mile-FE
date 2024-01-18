import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export const removeNullUndefined = (obj: any) => {
  if (!obj) return;
  return Object.entries(obj).reduce(
    (a: any, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
};

export const convertSearchParams = (params: any) => {
  if (!params) return;

  const urlParams = new URLSearchParams();
  Object.entries(params).reduce((_: any, [k, v]) => {
    if (v && typeof v !== "object" && !Array.isArray(v)) {
      urlParams.append(k, v as any);
    } else if (Array.isArray(v) && v.length > 0) {
      for (const value of v) {
        urlParams.append(k, value);
      }
    }
  }, {});

  return urlParams;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type Template = "number" | "format" | "dayjs";
export function getCurrentMonth(template: "number"): number;
export function getCurrentMonth(template: "format"): string;
export function getCurrentMonth(template: "dayjs"): Dayjs;

export function getCurrentMonth(template: Template = "format") {
  const dayjsInstance = dayjs();
  switch (template) {
    case "number":
      return dayjsInstance.month();
    case "dayjs":
      return dayjsInstance;
    case "format":
      return dayjsInstance.format("MMMM");
    default:
      throw Error(`Parameter ${template} is not valid`);
  }
}

export function getPreviousMonth(template: "number"): number;
export function getPreviousMonth(template: "format"): string;
export function getPreviousMonth(template: "dayjs"): Dayjs;

export function getPreviousMonth(template: Template) {
  const currentMonth = getCurrentMonth("dayjs");
  const previousMonth = dayjs(currentMonth).subtract(1, "months");

  switch (template) {
    case "number":
      return previousMonth.get("month");
    case "format":
      return previousMonth.format("MMMM");
    case "dayjs":
      return previousMonth;
    default:
      throw Error(`Parameter ${template} is not valid`);
  }
}
