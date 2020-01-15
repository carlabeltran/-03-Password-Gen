//DOM(Document Object Model)
const resultEl = document.getElementById("display");
console.log("display");

const lengthEl = document.getElementById("length");
console.log("length");

const uppercaseEl = document.getElementById("uppercase");
console.log("uppercase");

const lowercaseEl = document.getElementById("lowercase");
console.log("lowercase");

const numbersEl = document.getElementById("numbers");
console.log("numbers");

const symbolsEl = document.getElementById("symbols");
console.log("symbols");

const generateEl = document.getElementById("generate");
console.log("generate");

const clipboardEl = document.getElementById("clipboard");
console.log("clipboard");

const previousPasswords = document.getElementById("lastNums");
console.log("lastNums");

//object for random functions
const randomFunc = {
	//properties of my object
	//key: property
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
	symbol: getRandomSymbol
};
console.log(randomFunc.lower);
console.log(randomFunc.upper);
console.log(randomFunc.number);
console.log(randomFunc.symbol);

//copy clipboard event listener
clipboardEl.addEventListener('click', () => {
	
	//creating a element from within javascript
	const textarea = document.createElement('textarea');
	
	//we variable and get from result innerText 
	const password = resultEl.innerText;
	
	//if click copy to clipboard and no value in pwd just return
	if(!password) {
	
		// takes text area and put value of password into it
		textarea.value = password;
		
		//places textarea in the body
		document.body.appendChild(textarea);
		//calling select
		//textarea.select();
		textarea.select();
		
		//copys the content to clipboard
		document.execCommand("copy");
		
		//removes the text area from the document
		textarea.remove();
		
		// alert message
		alert("Password copied to clipboard!");
	}
});

//generate event listener(this is just getting the values)
generate.addEventListener('click', () => {
	//this has the value of length
	const length = +lengthEl.value;
	//console.log(length)
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	//console.log(typeof length);
	//console.log(hasLower, hasUpper, hasNumber, hasSymbol);
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//generate password function
function generatePassword(lower, upper, number, symbol, length) {
	
	//initate password variable
	let generatedPassword = '';

	//allows count array the number of checked items
	const typesCount = lower + upper + number + symbol;
	console.log('typesCount: ', typesCount);

	//array of objects has keys
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	//filter out what is false=unchecked types in the array and looping through based on a true or false value
	console.log('typesArr: ', typesArr);
	
	//validating non-checked not to proceed(typesCount) = the number of checked boxes 
	if(typesCount === 0) {
		
		//if types count is 0 we want to return nothing.
		return '';
	}
	
	// for loop over the length and then call the generator function for each type 
	// (let i=0; condition-if i is less than the length"20"; increment by the types count the number of checked boxes)
    for(let i = 0; i < length; i += typesCount) {
		
		//loop through array.with-forEach(each type)
		typesArr.forEach(type => {
			
			//open block to get function name = object.keys and pass in type because looping through types array and get first value
			const funcName = Object.keys(type)[0];
			console.log('funcName: ', funcName);
			
			//appending empty generated password string
			generatedPassword += randomFunc[funcName]();
	});
}
	//This validates the length and password length match
	const finalPassword = generatedPassword.slice(0, length);	
	//console.log(generatedPassword.slice(0, length));
	//console.log(generatedPasword);

	//display generated password
	document.getElementById('display').value = finalPassword;

	//display previously generated passwords
	document.getElementById('lastNums').innerHTML += finalPassword + "<br />"; 

	return finalPassword;
}

//generator functions charset website: http://www.net-comber.com/charset.net
//random lowercase letters
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
console.log(getRandomLower());

//random uppercase letters 
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
console.log(getRandomUpper());

//random number 
function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
console.log(getRandomNumber());

//random symbols 
function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
console.log(getRandomSymbol());

