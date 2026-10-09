export function convertUsersToKMCr(userCount: number): string {
  if (userCount >= 10000000) {
    return (userCount / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  } else if (userCount >= 1000000) {
    return (userCount / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (userCount >= 1000) {
    return (userCount / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return userCount.toString();
  }
}