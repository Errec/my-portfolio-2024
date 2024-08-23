function polyfill() {
    // Check if the browser supports 'scrollBehavior'
    if ('scrollBehavior' in document.documentElement.style) {
      return;
    }
  
    const SCROLL_TIME = 468;
  
    const original = {
      scroll: window.scroll || window.scrollTo,
      scrollBy: window.scrollBy,
      elScroll: HTMLElement.prototype.scroll || scrollElement,
      scrollIntoView: HTMLElement.prototype.scrollIntoView,
    };
  
    const now = window.performance && window.performance.now
      ? window.performance.now.bind(window.performance)
      : Date.now;
  
    // Function to handle element scrolling
    function scrollElement(this: HTMLElement, x: number, y: number) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }
  
    // Easing function for smooth scroll animation
    function ease(k: number) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  
    // Function to determine if smooth scrolling should be bypassed
    function shouldBailOut(x: unknown): boolean {
      if (
        typeof x !== 'object' ||
        x === null ||
        (x as { behavior?: ScrollBehavior }).behavior === undefined ||
        (x as { behavior?: ScrollBehavior }).behavior === 'auto' ||
        (x as { behavior?: ScrollBehavior }).behavior === 'instant'
      ) {
        return true;
      }
  
      if (typeof x === 'object' && (x as { behavior?: ScrollBehavior }).behavior === 'smooth') {
        return false;
      }
  
      throw new TypeError('behavior not valid');
    }
  
    // Function to find the nearest scrollable parent element
    function findScrollableParent(el: Node): HTMLElement {
      let isBody: boolean;
      let hasScrollableSpace: boolean;
      let hasVisibleOverflow: boolean;
  
      do {
        el = el.parentNode as Node;
  
        // Check if we've reached the body or document element
        if (!el || el === document.body || !(el instanceof HTMLElement)) {
          return document.body;
        }
  
        isBody = el === document.body;
        hasScrollableSpace =
          el.clientHeight < el.scrollHeight ||
          el.clientWidth < el.scrollWidth;
        hasVisibleOverflow =
          window.getComputedStyle(el).overflow === 'visible';
      } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow));
  
      return el;
    }
  
    // Step function to animate the scroll
    function step(context: {
      scrollable: Window | HTMLElement;
      method: (x: number, y: number) => void;
      startTime: number;
      startX: number;
      startY: number;
      x: number;
      y: number;
    }) {
      const time = now();
      let value;
      let currentX;
      let currentY;
      let elapsed = (time - context.startTime) / SCROLL_TIME;
  
      elapsed = elapsed > 1 ? 1 : elapsed;
  
      value = ease(elapsed);
  
      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;
  
      context.method.call(context.scrollable, currentX, currentY);
  
      if (currentX !== context.x || currentY !== context.y) {
        window.requestAnimationFrame(step.bind(window, context));
      }
    }
  
    // Function to perform smooth scroll
    function smoothScroll(el: HTMLElement | Window, x: number, y: number) {
      let scrollable: Window | HTMLElement;
      let startX: number;
      let startY: number;
      let method: (x: number, y: number) => void;
      const startTime = now();
  
      if (el === document.body) {
        scrollable = window;
        startX = window.scrollX || window.pageXOffset;
        startY = window.scrollY || window.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = (el as HTMLElement).scrollLeft;
        startY = (el as HTMLElement).scrollTop;
        method = scrollElement;
      }
  
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y,
      });
    }
  
    // Override window.scroll and window.scrollTo with smooth scroll behavior
    window.scroll = window.scrollTo = function () {
      if (shouldBailOut(arguments[0])) {
        original.scroll.call(
          window,
          (arguments[0] as { left: number }).left || arguments[0],
          (arguments[0] as { top: number }).top || arguments[1]
        );
        return;
      }
  
      smoothScroll.call(
        window,
        document.body,
        ~~(arguments[0] as { left: number }).left,
        ~~(arguments[0] as { top: number }).top
      );
    };
  
    // Override window.scrollBy with smooth scroll behavior
    window.scrollBy = function () {
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          window,
          (arguments[0] as { left: number }).left || arguments[0],
          (arguments[0] as { top: number }).top || arguments[1]
        );
        return;
      }
  
      smoothScroll.call(
        window,
        document.body,
        ~~(arguments[0] as { left: number }).left + (window.scrollX || window.pageXOffset),
        ~~(arguments[0] as { top: number }).top + (window.scrollY || window.pageYOffset)
      );
    };
  
    // Override HTMLElement.prototype.scroll and scrollTo with smooth scroll behavior
    HTMLElement.prototype.scroll = HTMLElement.prototype.scrollTo = function () {
      if (shouldBailOut(arguments[0])) {
        original.elScroll.call(
          this,
          (arguments[0] as { left: number }).left || arguments[0],
          (arguments[0] as { top: number }).top || arguments[1]
        );
        return;
      }
  
      const left = (arguments[0] as { left: number }).left;
      const top = (arguments[0] as { top: number }).top;
  
      smoothScroll.call(
        this,
        this,
        typeof left === 'number' ? left : this.scrollLeft,
        typeof top === 'number' ? top : this.scrollTop
      );
    };
  
    // Override HTMLElement.prototype.scrollBy with smooth scroll behavior
    HTMLElement.prototype.scrollBy = function () {
      const arg0 = arguments[0];
  
      if (typeof arg0 === 'object') {
        this.scroll({
          left: (arg0 as { left: number }).left + this.scrollLeft,
          top: (arg0 as { top: number }).top + this.scrollTop,
          behavior: (arg0 as { behavior?: ScrollBehavior }).behavior,
        });
      } else {
        this.scroll(
          this.scrollLeft + (arg0 as number),
          this.scrollTop + (arguments[1] as number)
        );
      }
    };
  
    // Override HTMLElement.prototype.scrollIntoView with smooth scroll behavior
    HTMLElement.prototype.scrollIntoView = function () {
      if (shouldBailOut(arguments[0])) {
        original.scrollIntoView.call(this, arguments[0] || true);
        return;
      }
  
      const scrollableParent = findScrollableParent(this);
  
      const parentRects = scrollableParent.getBoundingClientRect();
      const clientRects = this.getBoundingClientRect();
  
      if (scrollableParent !== document.body) {
        smoothScroll(
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );
        window.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth',
        });
      } else {
        window.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth',
        });
      }
    };
  }
  
  export default polyfill;
  