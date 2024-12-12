
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
