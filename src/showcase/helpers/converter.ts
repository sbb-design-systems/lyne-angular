/**
 * Convert milliseconds to seconds; mainly used in stories for `now` property.
 */
export const convertMillisecondsToSeconds = (milliseconds: number): number => {
  return milliseconds / 1000;
};

/**
 * Convert milliseconds to date; mainly used in stories for `min`/`max` properties.
 */
export const convertMillisecondsToDate = (milliseconds: number): Date => {
  return new Date(milliseconds);
};
