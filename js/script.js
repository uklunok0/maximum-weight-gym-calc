import { deleteMainBtn, returnToTop } from "./modules/createButtons.js";
import { inputItemsForm } from "./modules/calc.js";

window.addEventListener("DOMContentLoaded", () => {
  // random rotate all emoji images
  function randomAngle() {
    return Math.floor(Math.random() * 360);
  }

  (function () {
    const emoji = document.querySelectorAll(".welcome__block-emoji-container");
    emoji.forEach((element) => {
      element.style.transform = `rotate(${randomAngle()}deg)`;
    });
  })();

  window.onload = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  deleteMainBtn();
  returnToTop();
  inputItemsForm();
});
