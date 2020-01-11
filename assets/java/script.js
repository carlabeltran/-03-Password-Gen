//DOM Elements
const resultEl = document.getElementById('result');
console.log('result');
const lengthEl = document.getElementById('length');
console.log('length');
const uppercaseEl = document.getElementById('uppercase');
console.log('uppercase');
const lowercaseEl = document.getElementById('lowercase');
console.log('lowercase');
const numbersEl = document.getElementById('numbers');
console.log('numbers');
const symbolsEl = document.getElementById('symbols');
console.log('symbols');
const generateEl = document.getElementById('generate');
console.log('generate');
const clipboard = document.getElementById('clipboard');
console.log('clipboard');
const previousPasswords = document.getElementById('lastNums');
console.log('lastNums');
//object
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
	symbol: getRandomSymbol
};
console.log(randomFunc.lower);
console.log(randomFunc.upper);
console.log(randomFunc.number);
console.log(randomFunc.symbol);

clipboard.addEventListener('click', () => {


function copyPassword() {
    document.getElementById("display").select();
    document.execCommand("copyClipboard");
    alert("Password copied to clipboard!");
}

//generate event listener
generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	console.log(typeof length);
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
//console.log(hasLower, hasUpper, hasNumber, hasSymbol);
//generate password
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	console.log('typesCount: ', typesCount);
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	console.log('typesArr: ', typesArr);
    if(typesCount === 0) {
        return '';
	}
    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			console.log('funcName: ', funcName);
			generatedPassword += randomFunc[funcName]();
		});
	};
	document.getElementById('display').value = generatedPassword;
	document.getElementById('lastNums').innerHTML += generatedPassword + "<br />";
	//set default length display of 25
	document.getElementById("length").innerHTML = "Length: 25";
	//function to set length based on slider position
	document.getElementById("length").oninput = function() {
    if(document.getElementById("length").value > 0){
		alert
		document.getElementById("length").value;
    }
    else{
        document.getElementById("length").innerHTML = "Length: 8";
    }
	const finalPassword = generatedPassword.slice(0, length);
	console.log(generatedPassword.slice(0, length));
	return finalPassword;
	};
}	
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
console.log(getRandomLower());

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
console.log(getRandomUpper());

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
console.log(getRandomNumber());

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
console.log(getRandomSymbol());