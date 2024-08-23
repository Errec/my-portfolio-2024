import { throttle } from './throttle';

function workGridAnimation() {
  const workItems = document.querySelectorAll('.main-work__item');

  if (!workItems.length) return;

  const regClassName = new RegExp('(^| )' + 'main-work__item--grow' + '($| )', 'g');
  let animationCount = 0;

  const removeGrowClass = throttle((workItem: Element) => {
    workItem.className = workItem.className.replace(regClassName, ' ');
    animationCount++;
  }, 1000);

  const transformWorkGrid = throttle(() => {
    workItems.forEach((workItem) => {
      const itemTop = window.scrollY - (workItem as HTMLElement).offsetTop;
      if (itemTop > -150 && window.innerWidth < 720 && (workItem.className.indexOf('main-work__item--grow') > -1)) {
        removeGrowClass(workItem);
        if (animationCount >= workItems.length) {
          window.removeEventListener('scroll', transformWorkGrid);
        }
      }
    });
  }, 200);

  window.addEventListener('scroll', transformWorkGrid);
}

export default workGridAnimation;
