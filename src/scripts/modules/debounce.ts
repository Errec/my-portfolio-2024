export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number,
    options: { leading?: boolean; maxWait?: number; trailing?: boolean } = {}
  ): T {
    let lastArgs: any;
    let lastThis: any;
    let maxWait: number | undefined;
    let result: any;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    let lastCallTime: number | undefined;
    let lastInvokeTime = 0;
    let leading = options.leading ?? false;
    let maxing = 'maxWait' in options;
    let trailing = options.trailing ?? true;
  
    if (typeof func != 'function') {
      throw new TypeError('Must be a function');
    }
    wait = Number(wait) || 0;
    if (maxing) {
      maxWait = Math.max(Number(options.maxWait) || 0, wait);
    }
  
    function invokeFunc(time: number) {
      const args = lastArgs;
      const thisArg = lastThis;
  
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
  
    function leadingEdge(time: number) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
  
    function remainingWait(time: number) {
      const timeSinceLastCall = time - (lastCallTime ?? 0);
      const timeSinceLastInvoke = time - lastInvokeTime;
      return maxing
        ? Math.min(wait - timeSinceLastCall, maxWait! - timeSinceLastInvoke)
        : wait - timeSinceLastCall;
    }
  
    function shouldInvoke(time: number) {
      const timeSinceLastCall = time - (lastCallTime ?? 0);
      const timeSinceLastInvoke = time - lastInvokeTime;
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait!)
      );
    }
  
    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
  
    function trailingEdge(time: number) {
      timerId = undefined;
  
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
  
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
  
    function flush() {
      return timerId === undefined ? result : trailingEdge(Date.now());
    }
  
    function debounced(this: any, ...args: any[]) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
  
      lastArgs = args;
      lastThis = this;
      lastCallTime = time;
  
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
  
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced as unknown as T;
  }
  