const spinner = document.querySelector("#spinner");

export default {
  hide() {
    spinner.classList.add("is-hidden");
  },
  show() {
    spinner.classList.remove("is-hidden");
  },
};
