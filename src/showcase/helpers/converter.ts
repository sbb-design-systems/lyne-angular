/**
 * Convert milliseconds to seconds; mainly used for `now` property.
 */
export const convertMillisecondsToSeconds = (milliseconds: number): number => {
  return milliseconds / 1000;
};
