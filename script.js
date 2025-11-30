const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-del]");
const percentageButton = document.querySelector("[data-percentage]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperandTextElement = previousOperand;
    this.currentOperandTextElement = currentOperand;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    if (stringNumber === "" || stringNumber === "-") {
      return stringNumber; // mostra "" ou "-" direto
    }
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  calculate() {
    let result = 0;

    const floatpreviousOperand = parseFloat(this.previousOperand);
    const floatcurrentOperand = parseFloat(this.currentOperand);

    if (isNaN(floatpreviousOperand) || isNaN(floatcurrentOperand)) return;

    switch (this.operator) {
      case "+":
        result = floatpreviousOperand + floatcurrentOperand;
        break;
      case "-":
        result = floatpreviousOperand - floatcurrentOperand;
        break;
      case "/":
        result = floatpreviousOperand / floatcurrentOperand;
        break;
      case "*":
        result = floatpreviousOperand * floatcurrentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operator = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  chooseOperation(operator) {
    if (this.currentOperand === "" && operator === "-") {
      this.currentOperand = "-";
      this.updateDisplay();
      return;
    }

    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  percentage() {
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.currentOperand = this.currentOperand / 100;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = this.currentOperand + number.toString();
    this.updateDisplay();
  }

  updateDisplay() {
    this.previousOperandTextElement.textContent =
      this.formatDisplayNumber(this.previousOperand) + (this.operator || "");
    this.currentOperandTextElement.textContent = this.formatDisplayNumber(
      this.currentOperand
    );
  }

  clear() {
    this.operator = undefined;
    this.currentOperand = "";
    this.previousOperand = "";
    this.updateDisplay();
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.textContent);
  });
}

for (const operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", () => {
    calculator.chooseOperation(operatorButton.textContent);
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
});

percentageButton.addEventListener("click", () => {
  calculator.percentage();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});
