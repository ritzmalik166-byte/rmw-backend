export function getFilterDate(day: number): Date {
  const currentDate = new Date();
  // Set to start of day (00:00:00) to avoid timezone issues
  currentDate.setHours(0, 0, 0, 0);
  
  const dayBeforeDate = new Date();
  dayBeforeDate.setDate(currentDate.getDate() - day);
  dayBeforeDate.setHours(0, 0, 0, 0);
  
  return dayBeforeDate;
}
