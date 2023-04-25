export default function parseDate(stringDate: string): string {
  const date = new Date(stringDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dateNow = new Date();
  const currentDay = dateNow.getDate();
  const currentMonth = dateNow.getMonth() + 1;
  const currentYear = dateNow.getFullYear();

  const isToday = (year === currentYear && month === currentMonth && day === currentDay);

  return `${isToday ? '' : `${day}/${month}/${year} `}${hours}:${minutes}`;
}
