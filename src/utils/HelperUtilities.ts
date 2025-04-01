export function toQueryParamString(
  params: Record<string, string | number | string[] | number[]>
): string {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.join(",")
        )}`;
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.toString()
        )}`;
      }
    })
    .join("&");
}

export const extractISTHour = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: true,
  }).format(new Date(isoDate));
};

export const extractISTDay = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(new Date(isoDate));
};

export const extractISTDate = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
  }).format(new Date(isoDate));
};
