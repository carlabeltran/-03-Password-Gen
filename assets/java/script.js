//Declared Variables
var results = document.getElementById("result");
var lengths = document.getElementById("length");
var generatePassword = document.getElementById("generate");
var copyClipboard = document.getElementById("copy");
var upperChar = document.getElementById("uppercase");
var lowerChar = document.getElementById("lowercase");
var number = document.getElementById("numbers");
var symbol = document.getElementById("symbols");
var previousPasswords = document.getElementById("prevPwd").innerHTML += pwd;

var randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	num: getRandomNumber,
	sym: getRandomSymbol
};

generate.addEventListener('click', () => {
	var length = +lengths.value;
	var hasLower = lowerChar.checked;
	var hasUpper = upperChar.checked;
	var hasNumber = number.checked;
	var hasSymbol = symbol.checked;
	
	results.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	var generatePassword = '';
	var typesCount = lower + upper + number + symbol;
	var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(var i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}
