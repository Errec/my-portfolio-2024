function scrollToSections() {
  const skillsLink = document.querySelector('.header__link-skills');
  const workLink = document.querySelector('.header__link-work');
  const aboutLink = document.querySelector('.header__link-about');

  const skillsDiv = document.querySelector('.main-skills');
  const workDiv = document.querySelector('.main-work');
  const aboutDiv = document.querySelector('.main-about');

  if (!skillsLink || !workLink || !aboutLink || !skillsDiv || !workDiv || !aboutDiv) return;

  const scrollIntoSkills = () => {
    skillsDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollIntoWork = () => {
    workDiv.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollIntoAbout = () => {
    aboutDiv.scrollIntoView({ behavior: 'smooth' });
  };

  skillsLink.addEventListener('click', scrollIntoSkills);
  workLink.addEventListener('click', scrollIntoWork);
  aboutLink.addEventListener('click', scrollIntoAbout);
}

export default scrollToSections;
