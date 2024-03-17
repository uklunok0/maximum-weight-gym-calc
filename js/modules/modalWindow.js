import { calc } from "./calc";
const calcObj = calc();

export async function modal() {
  // показать модальное окно
  let gender = "";
  const genderButtons = document.querySelectorAll(".gender-button");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal__content");
  const closeBtn = document.querySelector(".modal__close");
  const modalContentText = document.querySelectorAll(".modal__content-text");
  const span = document.querySelector("span");

  genderButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.name == "manButton") {
        gender = "male";
        modalContent.classList.add("modal__content-male");
        closeBtn.classList.add("modal__close-male");
        modalContentText.forEach((item) =>
          item.classList.add("modal__content-text-male")
        );
      } else if (event.target.name == "femaleButton") {
        gender = "female";
        modalContent.classList.add("modal__content-female");
        closeBtn.classList.add("modal__close-female");
        modalContentText.forEach((item) =>
          item.classList.add("modal__content-text-female")
        );
      }

      modal.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      modal.style.display = "block";
      modalContent.classList.add("scale-in-ver-top");
      calc(gender);
    });
  });

  // закрыть модальное окно по нажатию escape
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.style.display == "block")
      showStyleCloseModal();
  });

  // закрыть модальное окно по нажатию креста
  closeBtn.addEventListener("click", (event) => {
    showStyleCloseModal();
    event.stopPropagation();
  });

  // закрыть модальное окно по нажатию на подложку
  const modalWrapper = document.querySelector(".modal__dialog");
  modalWrapper.addEventListener("click", (event) => {
    if ((modal.style.display = "block") && event.target == modalWrapper) {
      showStyleCloseModal();
    }
  });

  function showStyleCloseModal() {
    modalContent.classList.remove("scale-in-ver-top");
    modalContent.classList.add("scale-out-ver-top");
    modalContent.addEventListener(
      "animationend",
      () => {
        modal.style.display = "none";
        modalContent.classList.remove("scale-out-ver-top");
        modalContent.classList.remove("modal__content-male");
        modalContent.classList.remove("modal__content-female");
        closeBtn.classList.remove("modal__close-male");
        closeBtn.classList.remove("modal__close-female");
        modalContentText.forEach((item) =>
          item.classList.remove("modal__content-text-male")
        );
        modalContentText.forEach((item) =>
          item.classList.remove("modal__content-text-female")
        );
      },
      { once: true }
    );

    calcObj.resetInputs();
  }
}
