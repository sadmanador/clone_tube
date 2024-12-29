export const value_converter = (value: string | number) => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (numValue >= 1000000) {
    return (numValue / 1000000).toFixed(2) + "M";
  } else if (numValue >= 1000 && numValue < 2000) {
    return (numValue / 1000).toFixed(1) + "K";
  } else if (numValue >= 2000) {
    return Math.floor(numValue / 1000) + "K";
  } else {
    return numValue.toFixed(2);
  }
};
