export const isTimeMatch = (time: string): boolean => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:mm
  return time === currentTime;
};
