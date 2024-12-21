export const value_converter = (value: string | number)=> {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (numValue >= 1000000) {
    return Math.floor(numValue / 1000000) + "M";
  } else if (numValue >= 1000) {
    return Math.floor(numValue / 1000) + "K";
  } else {
    return numValue;
  }
};
