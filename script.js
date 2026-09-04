
const display = document.querySelector("#display");

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) return "Error";
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

let counter = 0;
let previousNumber = 0;
let newNumber = 0;
let currentOperation = '';
let shouldResetDisplay = false;

function clickButton(e) {
    if (!e.target.classList.contains('btn')) return;

    let displayText = display.textContent.trim();
    const btnText = e.target.textContent.trim();

    if (btnText === 'C') {
        display.textContent = '';
        previousNumber = 0;
        newNumber = 0;
        currentOperation = '';
        counter = 0;
        shouldResetDisplay = false;
        return;
    }

    if (btnText === '⌫') {
        if (displayText === 'Error' || shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        } else {
            display.textContent = displayText.slice(0, -1);
        }
        return;
    }

    if (btnText === '.' && displayText.includes('.')) return;

    // 4. Operators
    if (['+', '-', '*', '/'].includes(btnText)) {
        if (displayText === '' || displayText === 'Error') {
            currentOperation = btnText;
            return;
        }

        if (counter === 0) {
            previousNumber = parseFloat(displayText);
            counter += 1;
        } else {
            newNumber = operate(
                previousNumber, 
                parseFloat(displayText), 
                currentOperation
            );
            previousNumber = newNumber;
        }
        shouldResetDisplay = false;
        currentOperation = btnText;
        display.textContent = '';

    } else if (btnText === '=') {
        if (displayText === '' || displayText === 'Error' || !currentOperation) return;

        newNumber = operate(
            previousNumber, 
            parseFloat(displayText), 
            currentOperation
        );
        shouldResetDisplay = true;
        currentOperation = '';
        display.textContent = newNumber;
        counter = 0;

    } else {
        if (shouldResetDisplay || displayText === 'Error') {
            displayText = '';
            shouldResetDisplay = false;
        }
        display.textContent = displayText + btnText;
    }
}

const buttons = document.querySelector("#buttons");
buttons.addEventListener('click', clickButton);
 