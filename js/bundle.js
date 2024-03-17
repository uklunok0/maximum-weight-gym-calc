/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calc: () => (/* binding */ calc),
/* harmony export */   inputItemsForm: () => (/* binding */ inputItemsForm)
/* harmony export */ });
function inputItemsForm() {
  document.querySelectorAll(".item__choose").forEach((item) => {
    item.addEventListener("focus", function () {
      this.removeAttribute("placeholder");
    });

    item.addEventListener("blur", function () {
      if (!this.value) {
        this.setAttribute(
          "placeholder",
          this.getAttribute("data-original-placeholder")
        );
      }
    });

    item.addEventListener("input", function () {
      if (this.value) {
        this.removeAttribute("placeholder");
      } else {
        this.setAttribute(
          "placeholder",
          this.getAttribute("data-original-placeholder")
        );
      }
    });

    item.setAttribute(
      "data-original-placeholder",
      item.getAttribute("placeholder")
    );
  });
}

function calc(sex) {
  const option = document.getElementById("disciplines");
  const parentSelector = document.querySelector(".calculating__result");
  const result = document.createElement("span");
  result.className = "result__data";

  let weightBarbell,
    quantityRepeat,
    weightSelf,
    optionSelected = "gym";
  option.addEventListener("click", () => (optionSelected = option.value));

  function calcTotal() {
    if (!weightBarbell || !quantityRepeat || !weightSelf) {
      result.cssText = "";
      return false;
    }
    if (sex == "male") {
      switch (optionSelected) {
        case "gym":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(
                (weightBarbell * quantityRepeat) / 34 + weightBarbell
              ).toFixed(1)
            )
          )} кг`;
          break;
        case "squat":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(
                (weightBarbell * quantityRepeat) / 30 + weightBarbell
              ).toFixed(1)
            )
          )} кг`;
          break;
        case "deadlift":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(
                (weightBarbell * quantityRepeat) / 27 + weightBarbell
              ).toFixed(1)
            )
          )} кг`;
          break;
      }
      result.classList.add("span-male");
      setTimeout(() => calcTotal(), 400);
    }
    if (sex == "female") {
      switch (optionSelected) {
        case "gym":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(weightBarbell * (1 + 0.02 * quantityRepeat)).toFixed(1)
            )
          )} кг`;
          break;
        case "squat":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(weightBarbell * (1 + 0.028 * quantityRepeat)).toFixed(
                1
              )
            )
          )} кг`;
          break;
        case "deadlift":
          result.textContent = `${Math.abs(
            parseFloat(
              Math.round(weightBarbell * (1 + 0.03 * quantityRepeat)).toFixed(1)
            )
          )} кг`;
          break;
      }
      result.classList.add("span-female");
      setTimeout(() => calcTotal(), 400);
    }
  }

  setTimeout(() => calcTotal(), 300);

  function getInputInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value == "") {
        if (result) deleteResultBlock();
      }
      if (input.value.match(/\D/g)) {
        // ввод только цифр
        input.style.border = "2px solid red";
        if (result) deleteResultBlock();
      } else {
        input.style.border = "1px solid #0bafee";
        if (result) deleteResultBlock();
        parentSelector.appendChild(result);
      }
      switch (
        input.getAttribute("id") // получить значения полей ввода
      ) {
        case "weightBarbell":
          weightBarbell = +input.value;
          break;
        case "quantityRepeat":
          quantityRepeat = +input.value;
          break;
        case "weightSelf":
          weightSelf = +input.value;
          break;
      }
      setTimeout(() => calcTotal(), 300);
    });
  }

  getInputInfo("#weightBarbell");
  getInputInfo("#quantityRepeat");
  getInputInfo("#weightSelf");

  return {
    resetInputs: function () {
      weightBarbell = 0;
      quantityRepeat = 0;
      weightSelf = 0;
      setTimeout(() => calcTotal(), 300);
      deleteResultBlock();
      document.querySelectorAll("input").forEach((item) => {
        item.value = "";
        item.setAttribute(
          "data-original-placeholder",
          item.getAttribute("placeholder")
        );
      });
      return weightBarbell, quantityRepeat, weightSelf;
    },
  };

  function deleteResultBlock() {
    result.textContent = "";
    document.querySelectorAll(".result__data").forEach((item) => {
      item.remove();
    });
  }
}


/***/ }),

/***/ "./js/modules/createButtons.js":
/*!*************************************!*\
  !*** ./js/modules/createButtons.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBtnsGender: () => (/* binding */ createBtnsGender),
/* harmony export */   deleteMainBtn: () => (/* binding */ deleteMainBtn),
/* harmony export */   returnToTop: () => (/* binding */ returnToTop)
/* harmony export */ });
/* harmony import */ var _modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalWindow */ "./js/modules/modalWindow.js");

function createBtnsGender() {
  return new Promise((resolve, reject) => {
    // добавить вопросительную фразу
    const questionContainer = document.querySelector(
      ".welcome__block-question-container"
    );
    if (questionContainer) {
      questionContainer.classList.add(
        "welcome__block-question-container-active"
      );
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
          document
            .querySelector(".welcome__block-button")
            .appendChild(femaleBtn);

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

function deleteMainBtn() {
  const mainBtn = document.querySelector("button[name='mainButton']");
  mainBtn.addEventListener("click", (event) => {
    if (event.target) {
      mainBtn.classList.add("scale-out-center"); // анимация ухода главной кнопки
      mainBtn.addEventListener(
        "animationend",
        () => {
          mainBtn.remove();
          createBtnsGender().then(() => {
            (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.modal)();
          });
        },
        { once: true }
      );
    }
  });
}

function returnToTop() {
  try {
    const bottomBtn = document.querySelector("button[name='bottom__button']");

    const clickHandler = () => {
      const mainBtn = document.querySelector("button[name='mainButton']");
      if (mainBtn) {
        mainBtn.remove();
        createBtnsGender().then(() => {
          (0,_modalWindow__WEBPACK_IMPORTED_MODULE_0__.modal)();
        });
      }

      bottomBtn.removeEventListener("click", clickHandler);
    };
    bottomBtn.addEventListener("click", clickHandler);
    bottomBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  } catch (error) {
    console.error(error);
  }
}


/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modal: () => (/* binding */ modal)
/* harmony export */ });
/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc */ "./js/modules/calc.js");

const calcObj = (0,_calc__WEBPACK_IMPORTED_MODULE_0__.calc)();

async function modal() {
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
      (0,_calc__WEBPACK_IMPORTED_MODULE_0__.calc)(gender);
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_createButtons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createButtons.js */ "./js/modules/createButtons.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");



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

  (0,_modules_createButtons_js__WEBPACK_IMPORTED_MODULE_0__.deleteMainBtn)();
  (0,_modules_createButtons_js__WEBPACK_IMPORTED_MODULE_0__.returnToTop)();
  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_1__.inputItemsForm)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map