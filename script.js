const display = document.querySelector('.calculator-input');
const buttons = document.querySelector('.calculator-button');

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

buttons.addEventListener("click", function(e){
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNum(element.value);       
    }
    updateDisplay();
    console.log(value);
    
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if (firstValue === null){
        firstValue = value;
    }
    else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator){
    if(operator === "+"){
        return first + second;
    }
    else if (operator === "-"){;
        return first - second;
    }    
    else if(operator === "*"){
        return first * second; 
    } 
    else if(operator === "/"){
        return first / second; 
    }
    return second;       
} 

function inputNum(num){
    if(waitingForSecondValue){
        displayValue = num
        waitingForSecondValue = false;
    }
    else{
        displayValue = displayValue === '0'? num: displayValue + num;
    }
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue = displayValue + ".";
    }
}

function clear(){
    displayValue = '0';
}