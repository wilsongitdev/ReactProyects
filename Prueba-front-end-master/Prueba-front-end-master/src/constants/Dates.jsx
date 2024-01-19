const today = new Date();
export const todayFormatted = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
)
  .toISOString()
  .split("T")[0];
export const startDateFormatted = new Date(
  today.getFullYear(),
  today.getMonth(),
  1
)
  .toISOString()
  .split("T")[0];
export const endDateFormatted = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
)
  .toISOString()
  .split("T")[0];
