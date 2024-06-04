import { modal } from "./modalWindow";
export function createBtnsGender() {
  return new Promise((resolve, reject) => {
    // добавить вопросительную фразу
    const questionContainer = document.querySelector(".welcome__block-question-container");
    if (questionContainer) {
      questionContainer.classList.add("welcome__block-question-container-active");
      const titleQuestion = document.createElement("h3");
      titleQuestion.innerHTML = "Кто ты?";
      titleQuestion.classList.add("welcome__block-question");
      titleQuestion.classList.add("tracking-in-expand-fwd"); // анимация появления вопроса
      questionContainer.appendChild(titleQuestion);

      titleQuestion.addEventListener(
        "animationend",
        () => {
          // создать две кнопки (муж, жен)
          const manBtn = document.createElement("button"),
            femaleBtn = document.createElement("button");

          manBtn.textContent = "Мужик!";
          femaleBtn.textContent = "Не мужик!";
          manBtn.name = "manButton";
          femaleBtn.name = "femaleButton";
          manBtn.classList.add("gender-button");
          manBtn.classList.add("slide-in-fwd-center"); // анимация появления кнопки №1
          femaleBtn.classList.add("gender-button");
          femaleBtn.classList.add("slide-in-fwd-center"); // анимация появления кнопки №2
          document.querySelector(".welcome__block-button").appendChild(manBtn);
          document.querySelector(".welcome__block-button").appendChild(femaleBtn);

          resolve();
        },
        { once: true }
      );
    } else {
      console.error("welcome__block-question-container не найден");
      reject(new Error("Ошибка при создании кнопок"));
    }
  });
}

export function deleteMainBtn() {
  const mainBtn = document.querySelector("button[name='mainButton']");
  mainBtn.addEventListener("click", (event) => {
    if (event.target) {
      mainBtn.classList.add("scale-out-center"); // анимация ухода главной кнопки
      mainBtn.addEventListener(
        "animationend",
        () => {
          mainBtn.remove();
          createBtnsGender().then(() => {
            modal();
          });
        },
        { once: true }
      );
    }
  });
}

export function returnToTop() {
  try {
    const bottomBtn = document.querySelector("button[name='bottom__button']");

    const clickHandler = () => {
      const mainBtn = document.querySelector("button[name='mainButton']");
      if (mainBtn) {
        mainBtn.remove();
        createBtnsGender().then(() => {
          modal();
        });
      }

      bottomBtn.removeEventListener("click", clickHandler);
    };
    bottomBtn.addEventListener("click", clickHandler);
    bottomBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  } catch (error) {
    console.error(error);
  }
}
