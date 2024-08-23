import { debounce } from './debounce';

export function throttle<T extends (...args: any[]) => void>(func: T, wait: number, options: { leading?: boolean, trailing?: boolean } = {}): T {
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  return debounce(func, wait, { leading, maxWait: wait, trailing });
}
