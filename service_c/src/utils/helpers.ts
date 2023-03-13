export function getGreenwichTime(): number {
  const currentTime = new Date();
  return currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
}
