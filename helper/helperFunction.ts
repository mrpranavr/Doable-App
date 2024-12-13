import { CardColors } from "@/constants/GlobalData";

export const randomColor = () => {
    if (!Array.isArray(CardColors) || CardColors.length === 0) {
      return "#FEF752";
    }

    const randomIndex = Math.floor(Math.random() * CardColors.length);
    return CardColors[randomIndex];
  };


export function getInitials(firstName: string | undefined | null, lastName: string | undefined | null) {
  if (!firstName || !lastName) {
      return
  }

  const firstInitial = firstName[0]?.toUpperCase();
  const lastInitial = lastName[0]?.toUpperCase();

  return `${firstInitial}${lastInitial}`;
}

export const formatDateToDayDateMonth = () => {
  const today = new Date();

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const dayNumber = today.getDate();
  const monthAbbr = today.toLocaleDateString('en-US', { month: 'short' })

  return `${dayName} ${dayNumber} · ${monthAbbr}`;
}


export function getDatePart(
  timestamp: number,
  part: 'day' | 'month' | 'year',
  abbr: boolean = false
): string | number {
  const date = new Date(timestamp);

  switch (part) {
    case 'day':
      return date.getDate();
    case 'month':
      const month = date.toLocaleString('default', { month: abbr ? 'short' : 'long' });
      return month;
    case 'year':
      const year = abbr ? date.getFullYear().toString().slice(-2) : date.getFullYear();
      return year;
    default:
      throw new Error("Invalid part specified. Use 'day', 'month', or 'year'.");
  }
}