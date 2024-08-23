function checkForm() {
    const message = document.getElementById("input-message") as HTMLInputElement;
    const email = document.getElementById("input-email") as HTMLInputElement;
    const inputBtn = document.getElementById("input-btn") as HTMLButtonElement;
    const form = document.getElementById("about-form") as HTMLFormElement;
  
    if (!message || !email || !inputBtn || !form) return;
  
    const checkEmpty = () => {
      if (email.value === "" || message.value === "") {
        alert("Can't submit empty email/message");
      } else {
        form.submit();
      }
    };
  
    inputBtn.addEventListener('click', checkEmpty);
  }
  
  export default checkForm;
  