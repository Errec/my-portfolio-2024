import parallaxAboutBg from './modules/animate-about-bg';
import animatePin from './modules/animate-footer-pin';
import heroAnimation from './modules/animate-hero';
import svgHover from './modules/animate-skill-items';
import workGridAnimation from './modules/animate-work-grid';
import checkForm from './modules/form';
import scrollToSections from './modules/header-nav';
import smoothScroll from './modules/smooth-scroll';

document.addEventListener('DOMContentLoaded', () => {
  console.log("Script is running");
  parallaxAboutBg();
  animatePin();
  heroAnimation();
  svgHover();
  workGridAnimation();
  checkForm();
  scrollToSections();
  smoothScroll();
});
