const keyboard_operations = document.querySelectorAll(".keyboard__operations");

const numbers = document.querySelectorAll(".keyboard__numbers");

const buttons = document.querySelectorAll(".buttons:not(delete)");

const result = document.querySelector(".result__text");

const operation_panel = document.querySelector(".operation");

const delete_btn = document.querySelector(".delete");

const equal = document.querySelector(".equals");

const coma = document.querySelector(".coma");

let first_number = null;
let operator = null;


let opertations_array = createArray(keyboard_operations);
let numbers_array = createArray(numbers);

function includesValue(array, value) {
    return array.includes(value);
};

function createArray(elements_array) {
    array = [];
    elements_array.forEach(element => {
        array.push(element.textContent);
    })
    return array;
};

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        let value = button.textContent;
        let includesValueInOperations = includesValue(opertations_array, value);
        let includesValueInNumbers = includesValue(numbers_array, value);
        /*Escribir operaciones*/
        if (includesValueInOperations) {
            first_number = parseFloat(result.textContent)
            operator = value;
            operation_panel.textContent = value;
            result.textContent = "0";//Se limpia para escribir segundo numero
        }

        /*Escribir numeros */
        if (includesValueInNumbers) {
            if (result.textContent == 0) result.textContent = value
            else if (result.textContent.length < 12) result.textContent += value;
        }

    })
});

equal.addEventListener("click", () => {
    if (first_number != null && operator != null) {
        let first = parseFloat(first_number.toString().replace(",", "."));
        let second_number = parseFloat(result.textContent.replace(",", "."));

        let final_result;
        switch (operator) {
            case "+": {
                final_result = first + second_number;
                break;
            }
            case "-": {
                final_result = first - second_number;
                break;
            }
            case "X": {
                final_result = first * second_number;
                break;
            }
            case "/": {
                final_result = first / second_number;
                break;
            }
        }


        result.textContent = final_result.toString().replace(".", ",");
        first_number = null;
        operator = null;
        operation_panel.textContent = "";


    }
});

delete_btn.addEventListener("click", () => {
    if (result.textContent != 0) {
        result.textContent = 0;
    }
});

coma.addEventListener("click", () => {

    if (!result.textContent.includes(",")) {
        result.textContent += ",";
    }
})
