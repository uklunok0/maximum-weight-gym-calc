export function inputItemsForm() {
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

export function calc(sex) {
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
