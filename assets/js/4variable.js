// Maximum number of minterms
const NUM_OF_MINTERMS = 16;

// The input by the user specifying which minterms to use
let inputVal;
var inputField = document.querySelector("#minterm-input");

// Contains all the buttons 
let mbuttons = [];
let ttmbuttons = [];
for (let i = 0; i < NUM_OF_MINTERMS; i++) {
    mbuttons.push(document.querySelector(`#m` + i));
    ttmbuttons.push(document.querySelector('#tt-m' + i));
}

// The array holding all the true/false values of each minterm
var mintermBools = [];



/** 
 * Fills the mintermBools array with initial values
 * @param {boolean} setAll Should we set all values to false?
 * @param {number} index Optional: Which value should we toggle?
 */
function setMintermBoolean(setAll, index) {
    if(setAll) {
        mintermBools = [];
        for(var i=0; i<NUM_OF_MINTERMS; i++) {
            mintermBools.push(false);
        }
    }
    else {
        if(index === undefined) 
            index = 0;
        if(mintermBools.length !== NUM_OF_MINTERMS) 
            throw "ERROR: Bool array not properly set!";
        mintermBools[index] = !mintermBools[index];
    }
}

/** Adds click listeners to all the cells of the k-map table */
function addEventListenersToKMap() {
    for(let i=0; i < NUM_OF_MINTERMS; i++) {
        mbuttons[i].addEventListener("click", function() {     
            setMintermBoolean(false, i);
            updateTables();
        });
    }
}

/** Adds click listeners to the f-column of the truth table */
function addEventListenersToTruthTable() {
    for(let i=0; i < NUM_OF_MINTERMS; i++) {
        ttmbuttons[i].addEventListener("click", function() {     
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
        let arr = input.split(" ");

        // Removes out of bound minterms
        for(let i=arr.length; i >= 0; i--) {
            if(arr[i] >= NUM_OF_MINTERMS)
                arr.splice(i, 1);
        }

        // Remove whitespace characters (if exists)
        arr = arr.filter(function(entry) { 
            return /\S/.test(entry); 
        });

        // Removes duplicate terms
        arr = arr.filter(function(item, pos) {
            return arr.indexOf(item) == pos;
        });

        return arr;
    }
}

/** Updates all the cells. Used after every change (input or button) */
function updateTables() {
    for(let i=0; i<NUM_OF_MINTERMS; i++) {
        let bu = mbuttons[i];
        let bx = ttmbuttons[i];
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