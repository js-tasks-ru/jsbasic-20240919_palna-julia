function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");

  function hidden() {
    const isHidden = text.hidden;

    if (isHidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  }

  button.addEventListener("click", hidden);
}
