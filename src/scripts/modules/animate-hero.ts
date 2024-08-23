import { throttle } from './throttle';

function heroAnimation() {
  console.log("Script is 3");
  const boxWrapper = document.getElementById('box-wrapper');
  const rightHand = document.getElementById('right-hand');
  const leftHand = document.getElementById('left-hand');
  const heroSection = document.getElementById('hero');

  if (!boxWrapper || !rightHand || !leftHand || !heroSection) return;

  const transformHero = throttle(() => {
    const currentPosition = (window.scrollY + window.innerHeight) - heroSection.clientHeight / 2.4;
    if (currentPosition > heroSection.offsetTop) {
      leftHand.classList.add("main-hero__left-hand--move");
      rightHand.classList.add("main-hero__right-hand--move");
      boxWrapper.classList.add("hero__box--state-1");
      window.removeEventListener('scroll', transformHero);
    }
  }, 500);

  window.addEventListener('scroll', transformHero);
}

export default heroAnimation;
