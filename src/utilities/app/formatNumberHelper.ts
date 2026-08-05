export default function formatNumberHelper(
  number: number | string,
  char: string = ",",
  precision: number | null = null
): string {
  // Convert to number if it's a string
  const numValue = typeof number === "string" ? parseFloat(number) : number;

  // If it's not a valid number, return the original as string
  if (typeof numValue !== "number" || isNaN(numValue)) {
    return typeof number === "string" ? number : number.toString();
  }

  let str: string =
    precision !== null ? numValue.toFixed(precision) : numValue.toString();
  const [intPart, decimalPart] = str.split(".");

  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, char);
  return decimalPart !== undefined
    ? `${formattedInt}.${decimalPart}`
    : formattedInt;
}
