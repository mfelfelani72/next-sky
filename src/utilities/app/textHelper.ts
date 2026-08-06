/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-11-02 06:07:10
 * @Description:
 */

export function smartTruncate(
  input: unknown,
  threshold = 10,
  maxFallback = 12,
): string {
  const s = String(input ?? "").trim();

  if (s.length <= threshold) return s;

  const hasSpace = /\s/.test(s);

  if (hasSpace) {
    const initials = s
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join(" . ");

    return initials;
  }

  return s.length > maxFallback ? s.slice(0, maxFallback) : s;
}

export const getInitials = (name: string): string => {
  const s = String(name ?? "").trim();
  if (!s) return "";

  // 1. Remove everything except letters and numbers (supports Unicode/Persian)
  // \p{L} matches any letter, \p{N} matches any number
  const cleanChars = s.replace(/[^\p{L}\p{N}]/gu, "");

  // 2. Take the first 2 characters
  const result = Array.from(cleanChars).slice(0, 1).join("");

  // 3. Optional: Convert to uppercase for English names
  return result.toUpperCase();
};
