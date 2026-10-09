export function getPercentage(compData: number, actualData: number): string {
  // Handle division by zero
  if (compData === 0) {
    if (actualData > 0) {
      return "∞%"; // Infinite growth from zero
    } else {
      return "0.00%"; // Both are zero
    }
  }
  
  const diff = actualData - compData;
  const per = (diff / compData) * 100;
  
  // Limit extremely large percentages for better UX
  if (per > 10000) {
    return "10000+%";
  }
  
  return per.toFixed(2) + "%";
}
