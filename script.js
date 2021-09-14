const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
updateDisplay();
function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener("click", function(e){
    const element = e.target;
    if(!element.matches("button")) return;
    if(element.classList.contains("operator")){
        handleOperator(element.value); 
        updateDisplay();
        return;
    }
    if(element.classList.contains("decimal")){
        inputDecimal(element.value);
        updateDisplay();
    }
    if(element.classList.contains("clear")){
        clear();
        updateDisplay(); 
        return;
    }
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }
    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculator(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = displayValue;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
}

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    }else{ 
    displayValue = displayValue === "0"? num: displayValue + num;
}
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += ".";
    }
    console.log(displayValue);
    
}
function clear(){
    displayValue = "0";
}

function calculator(first,second,operator){
    if(operator === "+"){
        return first + second;
    }else if(operator === "-"){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }
    return second;
}
