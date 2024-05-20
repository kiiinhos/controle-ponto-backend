export const calculateWorkTime = (
  entry: { dateEntry: string; hourEntry: string },
  exit: { dateExit: string; hourExit: string },
): string => {
  const entryTime = new Date(`${entry.dateEntry}T${entry.hourEntry}`);
  const exitTime = new Date(`${exit.dateExit}T${exit.hourExit}`);
  const diff = exitTime.getTime() - entryTime.getTime();

  if (diff < 0) return '0h 0m';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};
