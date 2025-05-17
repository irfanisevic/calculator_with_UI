const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      clearDisplay();
    } else if (value === '=') {
      calculateResult();
    } else if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
    } else {
      appendNumber(value);
    }
  });
});

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  display.textContent = '0';
}

function appendNumber(number) {
  if (currentInput.length < 10) {
    currentInput += number;
    display.textContent = currentInput;
  }
}

function setOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') calculateResult();
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculateResult() {
  if (currentInput === '' || previousInput === '' || operator === '') return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    default:
      return;
  }

  display.textContent = result.toString().slice(0, 10);
  currentInput = result.toString();
  previousInput = '';
  operator = '';
}