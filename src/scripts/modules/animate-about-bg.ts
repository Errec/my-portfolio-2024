import { debounce } from './debounce';

function parallaxAboutBg() {
  console.log("Script is running");
  const parallaxAboutBgImg = document.getElementById('about-parallax-img');
  const about = document.getElementById('about');

  if (!parallaxAboutBgImg || !about) return;

  const checkAboutHeight = () => {
    const slideInAt = (window.scrollY + window.innerHeight) - about.clientHeight / 1.2;
    const isHalfShown = slideInAt > about.offsetTop;
    if (isHalfShown) {
      parallaxAboutBgImg.style.transform = "translate3d(0, -100%, 0)";
      window.removeEventListener('scroll', checkAboutHeight);
    }
  };

  window.addEventListener('scroll', debounce(checkAboutHeight, 200));
}

export default parallaxAboutBg;
