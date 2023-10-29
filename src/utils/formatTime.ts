import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// ----------------------------------------------------------------------

export function fDate(date: string, newFormat?: string) {
  const fm = newFormat || "DD/MM/YYYY";

  return date ? dayjs(new Date(date)).format(fm) : "";
}

export function fDateTime(date: string, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? dayjs(new Date(date)).format(fm) : "";
}

export function fTimestamp(date: string) {
  return date ? dayjs(new Date(date)).unix() : "";
}

export function fToNow(date: dayjs.Dayjs) {
  return date ? dayjs(date).toNow() : "";
}
