/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-12-25 12:50:52
 * @Description:
 */

type Procedure = (...args: any[]) => void;

export default function debounce<F extends Procedure>(
  func: F,
  timeout = 300
): (...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}
