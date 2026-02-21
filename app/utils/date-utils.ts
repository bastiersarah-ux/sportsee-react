export const formatMinutesToString = (
  min: number,
): { hours: number; minutes: number } => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  return { hours, minutes };
};

export const getCurrentWeek = (): { start: Date, end: Date, monday: string; sunday: string } => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = dimanche, 1 = lundi...

  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "numeric", year: "numeric" };

  return {
    monday: monday.toLocaleDateString("fr-FR", options),
    start: monday,
    sunday: sunday.toLocaleDateString("fr-FR", options),
    end: sunday,
  };
};
