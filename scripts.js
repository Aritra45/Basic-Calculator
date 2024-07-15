document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let resultDisplayed = false;
    let memory = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'equals') {
                calculateResult();
            } else if (button.id === 'memory-clear') {
                memory = 0;
            } else if (button.id === 'memory-recall') {
                currentInput = memory.toString();
                updateDisplay();
            } else if (button.id === 'memory-add') {
                memory += parseFloat(currentInput);
                clearDisplay();
            } else if (button.id === 'memory-subtract') {
                memory -= parseFloat(currentInput);
                clearDisplay();
            } else if (button.id === 'backspace') {
                backspace();
            } else {
                handleInput(value);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key >= '0' && key <= '9' || key === '.') {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')' || key === '^') {
            handleInput(key);
        } else if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === 'Backspace') {
            backspace();
        }
    });

    function handleInput(value) {
        if (resultDisplayed) {
            currentInput = '';
            resultDisplayed = false;
        }
        currentInput += value;
        updateDisplay();
    }

    function calculateResult() {
        try {
            const sanitizedInput = currentInput.replace(/√/g, 'Math.sqrt').replace(/%/g, '/100').replace(/\^/g, '**');
            const result = eval(sanitizedInput);
            currentInput = result.toString();
            resultDisplayed = true;
            updateDisplay();
        } catch (error) {
            alert('Error in calculation');
            clearDisplay();
        }
    }

    function clearDisplay() {
        currentInput = '';
        resultDisplayed = false;
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function backspace() {
        if (resultDisplayed) {
            currentInput = '';
            resultDisplayed = false;
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }
});
