var formula = document.querySelector("#final-formula");
var m0button = document.querySelector("#m0");
var m1button = document.querySelector("#m1");
var m2button = document.querySelector("#m2");
var m3button = document.querySelector("#m3");
var m4button = document.querySelector("#m4");
var m5button = document.querySelector("#m5");
var m6button = document.querySelector("#m6");
var m7button = document.querySelector("#m7");

var m0b = false;
var m1b = false;
var m2b = false;
var m3b = false;
var m4b = false;
var m5b = false;
var m6b = false;
var m7b = false;

var minterms = [];
var mintermsSimp = [];

const NUM_Of_VARIABLES = 3;

/**
 * Everytime a button is pressed, makes and updates the formula
 */
function buildString() {
    var finalStr = "0";
    var difference = false;
    var indexOfDiff;
    var mintermsTemp = minterms.slice();

    for(var numOfVar = 0; numOfVar < NUM_Of_VARIABLES; numOfVar++) { console.log("LOOP " + numOfVar);

        // Cycle through minterms array
        for(var i=0; i < mintermsTemp.length; i++) {

            // Cycle through array to compare with first cycle
            for(var j=0; j < mintermsTemp.length; j++) {

                // Compares elements to check for single letter differences
                if(i !== j && mintermsTemp[i].length === mintermsTemp[j].length) {

                    console.log("Starting check - - -");

                    difference = false;

                    // Compares letters in the string
                    for(var k=0; k < mintermsTemp[i].length; k++) {

                        // Marks index of difference if exists
                        if(mintermsTemp[i].charAt(k) != mintermsTemp[j].charAt(k)) {
                            console.log("There is one difference - - -> | " + mintermsTemp[i].charAt(k) + " " + mintermsTemp[j].charAt(k)) + " |";

                            // Breaks out of loop is more than one difference exists
                            if(difference) {
                                console.log("Too many differences!!!");
                                difference = false;
                                break;
                            }
                            else {
                                difference = true;
                                indexOfDiff = k;
                            }
                        }
                    }

                    // If there is a difference, replace different characters with just placeholder 'x'
                    console.log("index = " + indexOfDiff);
                    if(difference) {
                        var tempStr = mintermsTemp[i];
                        tempStr = tempStr.substr(0, indexOfDiff) + "x" + tempStr.substr(indexOfDiff + 1);
                        console.log("New String - - - " + tempStr);
                        mintermsSimp.push(tempStr);
                    }

                    console.log("finished compaing");
                }
            }

        }

        // Removes duplicates from minterm array
        mintermsSimp = mintermsSimp.filter(function(value,index,array) {
            return array.indexOf(value) == index;
        });
        
        // Debug  -  -  -
        console.log("Current Array - - -");
        for(var i=0; i < mintermsTemp.length; i++) {
            console.log(mintermsTemp[i]);
        }
        console.log("New Array - - -");
        for(var i=0; i < mintermsSimp.length; i++) {
            console.log(mintermsSimp[i]);
        }
        //  -  -  -  -  -

        mintermsTemp = mintermsSimp.slice();
        mintermsSimp = [];
    }

    if(m0b && m1b && m2b && m3b && m4b && m5b && m6b && m7b) {
        finalStr = "1";
    }

    formula.textContent = finalStr;
}

/** 
 * Finds an element in an array and removes it
 * @param {string} el The content of the array to be removed
 */
function removeElementFromArray(el) {
    for(var i=0; i < minterms.length; i++) {
        if(minterms[i] === el) {
            minterms.splice(i, 1);
            break;
        }
    }
}



m0button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m0b = true;
        this.innerHTML = "1";
        minterms.push("000");
    }
    else {
        m0b = false;
        this.innerHTML = "0";
        removeElementFromArray("000");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m1button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m1b = true;
        this.innerHTML = "1";
        minterms.push("001");
    }
    else {
        m1b = false;
        this.innerHTML = "0";
        removeElementFromArray("001");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m2button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m2b = true;
        this.innerHTML = "1";
        minterms.push("010");
    }
    else {
        m2b = false;
        this.innerHTML = "0";
        removeElementFromArray("010");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m3button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m3b = true;
        this.innerHTML = "1";
        minterms.push("011");
    }
    else {
        m3b = false;
        this.innerHTML = "0";
        removeElementFromArray("011");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m4button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m4b = true;
        this.innerHTML = "1";
        minterms.push("100");
    }
    else {
        m4b = false;
        this.innerHTML = "0";
        removeElementFromArray("100");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m5button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m5b = true;
        this.innerHTML = "1";
        minterms.push("101");
    }
    else {
        m5b = false;
        this.innerHTML = "0";
        removeElementFromArray("101");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m6button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m6b = true;
        this.innerHTML = "1";
        minterms.push("110");
    }
    else {
        m6b = false;
        this.innerHTML = "0";
        removeElementFromArray("110");
    }
    this.classList.toggle("selected-button");
    buildString();
});

m7button.addEventListener("click", function() {
    if(this.innerHTML == "0") {
        m7b = true;
        this.innerHTML = "1";
        minterms.push("111");
    }
    else {
        m7b = false;
        this.innerHTML = "0";
        removeElementFromArray("111");
    }
    this.classList.toggle("selected-button");
    buildString();
});
