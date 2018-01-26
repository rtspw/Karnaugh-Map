var inputField = document.querySelector("#minterm-input");
var m0button = document.querySelector("#m0");
var m1button = document.querySelector("#m1");
var m2button = document.querySelector("#m2");
var m3button = document.querySelector("#m3");
var m4button = document.querySelector("#m4");
var m5button = document.querySelector("#m5");
var m6button = document.querySelector("#m6");
var m7button = document.querySelector("#m7");
var ttm0button = document.querySelector("#tt-m0");
var ttm1button = document.querySelector("#tt-m1");
var ttm2button = document.querySelector("#tt-m2");
var ttm3button = document.querySelector("#tt-m3");
var ttm4button = document.querySelector("#tt-m4");
var ttm5button = document.querySelector("#tt-m5");
var ttm6button = document.querySelector("#tt-m6");
var ttm7button = document.querySelector("#tt-m7");

var mintermBools = [];

let inputVal;

/** 
 * Fills the mintermBools array with initial values
 * @param {boolean} setAll Should we set all values to false?
 * @param {number} index Optional: Which value should we toggle?
 */
function setMintermBoolean(setAll, index) {
    if(setAll) {
        mintermBools = [];
        for(var i=0; i<8; i++) {
            mintermBools.push(false);
        }
    }
    else {
        if(index === undefined) 
            index = 0;
        if(mintermBools.length !== 8) 
            throw "ERROR: Bool array not properly set!";
        mintermBools[index] = !mintermBools[index];
    }
}

/** Adds click listeners to all the cells of the k-map table */
function addEventListenersToKMap() {
    for(let i=0; i < 8; i++) {
        window["m" + i + "button"].addEventListener("click", function() {     
            setMintermBoolean(false, i);
            updateTables();
        });
    }
}

/** Adds click listeners to the f-column of the truth table */
function addEventListenersToTruthTable() {
    for(let i=0; i < 8; i++) {
        window["ttm" + i + "button"].addEventListener("click", function() {     
            setMintermBoolean(false, i);
            updateTables();
        });
    }
}

/** Add listener to store input values and clear on "enter" */
function addEventListenerToInput() {
    inputField.addEventListener("keypress", function(e) {
        // Reset field and store value on "enter"
        if(e.which === 13) {
            inputVal = inputField.value;
            inputField.value = "";
            let mintermArray = cleanInput(inputVal);
            setMintermBoolean(true);
            for(let i=0; i<mintermArray.length; i++) {
                setMintermBoolean(false, mintermArray[i]);
            }
            updateTables();
        }
    });
}

/** Removes all non-numeric values and stores values in array
 * @param {string} input String inputted by user
 * @return {array} Returns an array with minterms
 */
function cleanInput(input) {
    if(input !== undefined) {

        // Remove non-numeric characters
        input = input.replace(/[^0-9\ ]/g,'');

        // Put into array with space delimiter
        var arr = input.split(" ");

        // Remove whitespace characters (if exists)
        arr = arr.filter(function(entry) { 
            return /\S/.test(entry); 
        });

        // Removes out of bound minterms
        for(let i=0; i < arr.length; i++) {
            if(arr[i] >= 8)
                arr.splice(i, 1);
        }

        return arr;
    }
}

/** Updates all the cells. Used after every change (input or button) */
function updateTables() {
    for(let i=0; i<8; i++) {
        let bu = window["m" + i + "button"];
        let bx = window["ttm" + i + "button"];
        if(mintermBools[i] === true) {
            bu.innerHTML = "1";
            bx.innerHTML = "1";
            bu.classList.add("selected-button");
            bx.classList.add("selected-button");
        }
        else {
            bu.innerHTML = "0";
            bx.innerHTML = "0";
            bu.classList.remove("selected-button");
            bx.classList.remove("selected-button");
        }
    }
}

/** Main Initialization */
function init() {
    setMintermBoolean(true);
    addEventListenersToKMap();
    addEventListenersToTruthTable();
    addEventListenerToInput();
}

init();