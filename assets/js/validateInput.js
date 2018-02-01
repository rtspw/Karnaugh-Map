function validateInput(input) {
    var validChars = /([0-9]|[d]| )+/;
    var strIn = input.value;
    var strOut = '';
    for(var i=0; i < strIn.length; i++) {
      strOut += (validChars.test(strIn.charAt(i)))? strIn.charAt(i) : '';
    }
    input.value = strOut;
}