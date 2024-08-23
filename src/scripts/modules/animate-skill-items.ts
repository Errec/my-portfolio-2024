function svgHover() {
    const svgUl = document.getElementById("skills-grid");
  
    if (!svgUl) return;
  
    const regClassName = new RegExp('(^| )' + 'main-skills__svg--fill' + '($| )', 'g');
  
    const showColor = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target !== e.currentTarget) {
        e.target.className = e.target.className.replace(regClassName, ' ');
      }
      e.stopPropagation();
    };
  
    const removeColor = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target !== e.currentTarget) {
        e.target.classList.add("main-skills__svg--fill");
      }
      e.stopPropagation();
    };
  
    svgUl.addEventListener("mouseover", showColor);
    svgUl.addEventListener("mouseout", removeColor);
  }
  
  export default svgHover;
  