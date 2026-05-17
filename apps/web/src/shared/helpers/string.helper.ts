export const capitalizeWords = (value: string): string => {
  if (!value) return value;
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
};
