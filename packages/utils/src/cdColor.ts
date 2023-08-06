/**
 * mixed color
 */
export const mixColor = function (color1: string, color2: string, opacity: number) {
  let red1 = parseInt(color1.slice(1, 3), 16);
  let green1 = parseInt(color1.slice(3, 5), 16);
  let blue1 = parseInt(color1.slice(5, 7), 16);
  if (opacity === 0) {
    return [red1, green1, blue1].toString();
  }
  const red2 = parseInt(color2.slice(1, 3), 16);
  const green2 = parseInt(color2.slice(3, 5), 16);
  red1 += Math.round(opacity * (red2 - red1));
  const blue2 = parseInt(color2.slice(5, 7), 16);
  green1 += Math.round(opacity * (green2 - green1));
  blue1 += Math.round(opacity * (blue2 - blue1));
  return "#" + red1.toString(16) + green1.toString(16) + blue1.toString(16);
};

/**
 * Get the grayscale value, the smaller the color, the deeper the color
 */
export const getColorLuma = function (color: string) {
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114;
};
