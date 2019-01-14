/**
 * All functions within this file are "Pure"
 * i.e. they have no side effects.
 * Given the same inputs they always return the same outputs.
 * No values outside the function are affected.
 */


/**
 * round() returns a number rounded to the specified number of decimal places.
 *
 * @param input number to be rounded
 * @param places number of decimal places to round to.
 */
export const round = function(input: number, places: number = 2): number {
  if (places <= 0 ) {
    return Math.round(input);
  } else {
    const place10 = Math.pow(10, places);
    return Math.round(input * place10) / place10;
  }
}
