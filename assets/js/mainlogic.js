var statesEnum = Object.freeze({
    "mintermTrue": 0,
    "mintermFalse": 1,
    "dontCare": 2
});

// Maximum number of minterms
let NUM_OF_MINTERMS = 0;
if(document.title === "Karnaugh Maps 3 Variables") {
    NUM_OF_MINTERMS = 8;
}
else if(document.title === "Karnaugh Maps 4 Variables") {
    NUM_OF_MINTERMS = 16;
}
else {
    NUM_OF_MINTERMS = 32;
}


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
 * @param {boolean} dontCare Set the index as a don't-care value?
 * @param {number} index Optional: Which value should we toggle?
 */
function setMintermBoolean(setAll, dontCare, index) {
    if(setAll) {
        mintermBools = [];
        for(var i=0; i<NUM_OF_MINTERMS; i++) {
            mintermBools.push(statesEnum.mintermFalse);
        }
    }
    else  {
        if(index === undefined) 
            index = 0;
        if(mintermBools.length !== NUM_OF_MINTERMS) 
            throw "ERROR: Bool array not properly set!";

        if(dontCare) // Force as don't care values
            mintermBools[index] = statesEnum.dontCare;
        else { // Cycle between three states
            if(mintermBools[index] == statesEnum.mintermFalse)
                mintermBools[index] = statesEnum.mintermTrue;
            else if(mintermBools[index] == statesEnum.mintermTrue)
                mintermBools[index] = statesEnum.dontCare;
            else
                mintermBools[index] = statesEnum.mintermFalse;
        }
    }
}

/** Adds click listeners to all the cells of the k-map table */
function addEventListenersToKMap() {
    for(let i=0; i < NUM_OF_MINTERMS; i++) {
        mbuttons[i].addEventListener("click", function() {     
            setMintermBoolean(false, false, i);
            updateTables();
        });
    }
}

/** Adds click listeners to the f-column of the truth table */
function addEventListenersToTruthTable() {
    for(let i=0; i < NUM_OF_MINTERMS; i++) {
        ttmbuttons[i].addEventListener("click", function() {     
            setMintermBoolean(false, false, i);
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
            let arrayContainer = cleanInput(inputVal);
            let mintermArray = arrayContainer[0];
            let dontcareArray = arrayContainer[1];
            setMintermBoolean(true);
            for(let i=0; i<mintermArray.length; i++) {
                setMintermBoolean(false, false, mintermArray[i]);
            }
            for(let i=0; i<dontcareArray.length; i++) {
                setMintermBoolean(false, true, dontcareArray[i]);
            }
            updateTables();
        }
    });
}

/** Removes all non-numeric values and stores values in array
 * @param {string} input String inputted by user
 * @return {array of array} An array of two arrays, [0]:values [1]:dontcares
 */
function cleanInput(input) {
    if(input !== undefined) {

        // Remove non-numeric characters
        input = input.replace(/[^0-9\ d]/g,'');

        // Put into array with space delimiter
        var arr = input.split(" ");

        // Remove whitespace characters (if exists)
        arr = arr.filter(function(entry) { 
            return /\S/.test(entry); 
        });

        let dontcarearr = [];
        // Extracts indexes with 'd' for don't-cares
        for(let i=arr.length-1; i >= 0; i--) {

            // If the index contains 'd', check if the pattern is right
            if(arr[i].indexOf('d') > -1) {
                if(/^[d][0-9]/.test(arr[i])) {
                    dontcarearr.push(arr[i].substring(1));   
                }
                arr.splice(i, 1);
            }
        }

        // Removes out of bound minterms
        for(let i=arr.length-1; i >= 0; i--) {
            if(arr[i] >= NUM_OF_MINTERMS) 
                arr.splice(i, 1);
        }

        return [arr, dontcarearr];
    }
}

/** Updates all the cells. Used after every change (input or button) */
function updateTables() {
    for(let i=0; i<NUM_OF_MINTERMS; i++) {
        let bu = mbuttons[i];
        let bx = ttmbuttons[i];
        if(mintermBools[i] === statesEnum.mintermTrue) {
            bu.innerHTML = "1";
            bx.innerHTML = "1";
            bu.classList = "map-button";
            bx.classList = "map-button";
            bu.classList.add("selected-button");
            bx.classList.add("selected-button");
        }
        else if (mintermBools[i] === statesEnum.dontCare) {
            bu.innerHTML = "X";
            bx.innerHTML = "X";
            bu.classList = "map-button";
            bx.classList = "map-button";
            bu.classList.add("dont-care-button");
            bx.classList.add("dont-care-button");
        }
        else {
            bu.innerHTML = "0";
            bx.innerHTML = "0";
            bu.classList = "map-button";
            bx.classList = "map-button";
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