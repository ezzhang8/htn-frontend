export function formatTimeRange(startTimestamp: number, endTimestamp: number): string {
  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);
  
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: "America/New_York"};
  return `${startDate.toLocaleTimeString('en-US', options)} – ${endDate.toLocaleTimeString('en-US', options)}`;
}

export function formatMonthDay(timestamp: number): string {
  const date = new Date(timestamp);
  
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', timeZone: "America/New_York"};
  return date.toLocaleDateString('en-US', options);
}

export function formatWeekday(timestamp: number): string {
  const date = new Date(timestamp);
  
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: "America/New_York" };
  return date.toLocaleDateString('en-US', options);
}
