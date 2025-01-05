import { CardColors } from "@/constants/GlobalData";
import { Task } from "@/constants/Types";

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
  timestamp: Date | any,
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

export const mapToTask = (raw: any) : Task => {
  console.log('Task type --> ', raw.type)
  return {
    id: raw.id,
    title: raw.title,
    endDate: new Date(raw.endDate),
    priority: raw.priority,
    startDate: new Date(raw.startDate),
    status: raw.status,
    type: raw.type,
    user_id: raw.user_id,
    description: raw.description,
    parent_task: raw.parent_task,
    tags: raw.tags
  }
}