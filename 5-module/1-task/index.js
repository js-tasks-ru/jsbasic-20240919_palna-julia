function hideSelf() {
  const button = document.querySelector(".hide-self-button");

  function hidden(e) {
    e.target.hidden = true;
  }

  button.addEventListener("click", hidden);
}
