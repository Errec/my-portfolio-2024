import { debounce } from './debounce';

function animatePin() {
  console.log("Script is 2");
  const pin = document.getElementById('footer-pin');

  if (!pin) return;

  const checkPin = () => {
    const currentPosition = window.scrollY + window.innerHeight;
    const totalHeight = document.documentElement.offsetHeight;

    if (totalHeight - currentPosition <= 10) {
      pin.classList.add('footer__pin--enter');
    } else {
      pin.classList.remove('footer__pin--enter');
    }
  };

  window.addEventListener('scroll', debounce(checkPin, 200));
}

export default animatePin;
