function e(t,o,n={}){let l,i,r,c,s,a;let d=0,u=n.leading??!1,m="maxWait"in n,w=n.trailing??!0;if("function"!=typeof t)throw TypeError("Must be a function");function f(e){let o=l,n=i;return l=i=void 0,d=e,c=t.apply(n,o)}function p(e){let t=e-(a??0),n=e-d;return void 0===a||t>=o||t<0||m&&n>=r}function h(){let e=Date.now();if(p(e))return g(e);s=setTimeout(h,function(e){let t=e-(a??0),n=e-d;return m?Math.min(o-t,r-n):o-t}(e))}function g(e){return(s=void 0,w&&l)?f(e):(l=i=void 0,c)}function y(...e){let t=Date.now(),n=p(t);if(l=e,i=this,a=t,n){if(void 0===s){var r;return d=r=a,s=setTimeout(h,o),u?f(r):c}if(m)return s=setTimeout(h,o),f(a)}return void 0===s&&(s=setTimeout(h,o)),c}return o=Number(o)||0,m&&(r=Math.max(Number(n.maxWait)||0,o)),y.cancel=function(){void 0!==s&&clearTimeout(s),d=0,l=a=i=s=void 0},y.flush=function(){return void 0===s?c:g(Date.now())},y}var t=function(){console.log("Script is running");let t=document.getElementById("about-parallax-img"),o=document.getElementById("about");if(!t||!o)return;let n=()=>{window.scrollY+window.innerHeight-o.clientHeight/1.2>o.offsetTop&&(t.style.transform="translate3d(0, -100%, 0)",window.removeEventListener("scroll",n))};window.addEventListener("scroll",e(n,200))},o=function(){console.log("Script is 2");let t=document.getElementById("footer-pin");t&&window.addEventListener("scroll",e(()=>{let e=window.scrollY+window.innerHeight;document.documentElement.offsetHeight-e<=10?t.classList.add("footer__pin--enter"):t.classList.remove("footer__pin--enter")},200))};function n(t,o,l={}){return e(t,o,{leading:l.leading??!0,maxWait:o,trailing:l.trailing??!0})}var l=function(){console.log("Script is 3");let e=document.getElementById("box-wrapper"),t=document.getElementById("right-hand"),o=document.getElementById("left-hand"),l=document.getElementById("hero");if(!e||!t||!o||!l)return;let i=n(()=>{window.scrollY+window.innerHeight-l.clientHeight/2.4>l.offsetTop&&(o.classList.add("main-hero__left-hand--move"),t.classList.add("main-hero__right-hand--move"),e.classList.add("hero__box--state-1"),window.removeEventListener("scroll",i))},500);window.addEventListener("scroll",i)},i=function(){let e=document.getElementById("skills-grid");if(!e)return;let t=RegExp("(^| )main-skills__svg--fill($| )","g");e.addEventListener("mouseover",e=>{e.target instanceof HTMLElement&&e.target!==e.currentTarget&&(e.target.className=e.target.className.replace(t," ")),e.stopPropagation()}),e.addEventListener("mouseout",e=>{e.target instanceof HTMLElement&&e.target!==e.currentTarget&&e.target.classList.add("main-skills__svg--fill"),e.stopPropagation()})},r=function(){let e=document.querySelectorAll(".main-work__item");if(!e.length)return;let t=RegExp("(^| )main-work__item--grow($| )","g"),o=0,l=n(e=>{e.className=e.className.replace(t," "),o++},1e3),i=n(()=>{e.forEach(t=>{window.scrollY-t.offsetTop>-150&&window.innerWidth<720&&t.className.indexOf("main-work__item--grow")>-1&&(l(t),o>=e.length&&window.removeEventListener("scroll",i))})},200);window.addEventListener("scroll",i)},c=function(){let e=document.getElementById("input-message"),t=document.getElementById("input-email"),o=document.getElementById("input-btn"),n=document.getElementById("about-form");e&&t&&o&&n&&o.addEventListener("click",()=>{""===t.value||""===e.value?alert("Can't submit empty email/message"):n.submit()})},s=function(){let e=document.querySelector(".header__link-skills"),t=document.querySelector(".header__link-work"),o=document.querySelector(".header__link-about"),n=document.querySelector(".main-skills"),l=document.querySelector(".main-work"),i=document.querySelector(".main-about");e&&t&&o&&n&&l&&i&&(e.addEventListener("click",()=>{n.scrollIntoView({behavior:"smooth"})}),t.addEventListener("click",()=>{l.scrollIntoView({behavior:"smooth"})}),o.addEventListener("click",()=>{i.scrollIntoView({behavior:"smooth"})}))},a=function(){if("scrollBehavior"in document.documentElement.style)return;let e={scroll:window.scroll||window.scrollTo,scrollBy:window.scrollBy,elScroll:HTMLElement.prototype.scroll||o,scrollIntoView:HTMLElement.prototype.scrollIntoView},t=window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now;function o(e,t){this.scrollLeft=e,this.scrollTop=t}function n(e){if("object"!=typeof e||null===e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw TypeError("behavior not valid")}function l(n,l,i){let r,c,s,a;let d=t();n===document.body?(r=window,c=window.scrollX||window.pageXOffset,s=window.scrollY||window.pageYOffset,a=e.scroll):(r=n,c=n.scrollLeft,s=n.scrollTop,a=o),function e(o){let n,l,i;let r=(t()-o.startTime)/468;n=.5*(1-Math.cos(Math.PI*(r=r>1?1:r))),l=o.startX+(o.x-o.startX)*n,i=o.startY+(o.y-o.startY)*n,o.method.call(o.scrollable,l,i),(l!==o.x||i!==o.y)&&window.requestAnimationFrame(e.bind(window,o))}({scrollable:r,method:a,startTime:d,startX:c,startY:s,x:l,y:i})}window.scroll=window.scrollTo=function(){if(n(arguments[0])){e.scroll.call(window,arguments[0].left||arguments[0],arguments[0].top||arguments[1]);return}l.call(window,document.body,~~arguments[0].left,~~arguments[0].top)},window.scrollBy=function(){if(n(arguments[0])){e.scrollBy.call(window,arguments[0].left||arguments[0],arguments[0].top||arguments[1]);return}l.call(window,document.body,~~arguments[0].left+(window.scrollX||window.pageXOffset),~~arguments[0].top+(window.scrollY||window.pageYOffset))},HTMLElement.prototype.scroll=HTMLElement.prototype.scrollTo=function(){if(n(arguments[0])){e.elScroll.call(this,arguments[0].left||arguments[0],arguments[0].top||arguments[1]);return}let t=arguments[0].left,o=arguments[0].top;l.call(this,this,"number"==typeof t?t:this.scrollLeft,"number"==typeof o?o:this.scrollTop)},HTMLElement.prototype.scrollBy=function(){let e=arguments[0];"object"==typeof e?this.scroll({left:e.left+this.scrollLeft,top:e.top+this.scrollTop,behavior:e.behavior}):this.scroll(this.scrollLeft+e,this.scrollTop+arguments[1])},HTMLElement.prototype.scrollIntoView=function(){if(n(arguments[0])){e.scrollIntoView.call(this,arguments[0]||!0);return}let t=function(e){let t,o,n;do{if(!(e=e.parentNode)||e===document.body||!(e instanceof HTMLElement))return document.body;t=e===document.body,o=e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth,n="visible"===window.getComputedStyle(e).overflow}while(!t&&!(o&&!n))return e}(this),o=t.getBoundingClientRect(),i=this.getBoundingClientRect();t!==document.body?(l(t,t.scrollLeft+i.left-o.left,t.scrollTop+i.top-o.top),window.scrollBy({left:o.left,top:o.top,behavior:"smooth"})):window.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}};document.addEventListener("DOMContentLoaded",()=>{console.log("Script is running"),t(),o(),l(),i(),r(),c(),s(),a()});
//# sourceMappingURL=index.fc9ac624.js.map