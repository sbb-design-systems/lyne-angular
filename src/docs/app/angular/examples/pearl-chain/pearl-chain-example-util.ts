export const at = (h: number, m: number): Date => {
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date;
};
