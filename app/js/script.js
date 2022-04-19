const words = [
	[
		"raise", "Elevate"
	],[
		"claim", "Allegation"
	],[
		"blame", "Fault"
	], [
		"pride", "Deadly sin"
	], [
		"broad", "large"
	]
]
const regExprson = /^[A-Z]$/
let tilesRow = 1;
let guessedWord;
let tileBoxes = document.querySelector('#tiles1');

const guessWord = randomWord(words.length);
const hintElement = document.querySelector('.word-hint');

function randomWord(maxWords){
	const randomWord = words[Math.floor(Math.random() * maxWords)];
	setTimeout(() => {
		hintElement.textContent += randomWord[1];
		hintElement.classList.add("hint-box");
	}, 500);
	return randomWord[0];
}

window.addEventListener('keydown', e => {
	const letter = e.key.toLocaleUpperCase();

	if(tileBoxes){
		if(letter === "BACKSPACE" && tileBoxes.dataset.letters != ""){
			removeLetter();
		}else if (tileBoxes.dataset.letters.length < 5 && regExprson.test(letter)){
			addLetter(letter);
		}else if(tileBoxes.dataset.letters.length == 5 && letter === "ENTER"){
			checkWord();
		}
	}
});

const toggleBtn = document.querySelectorAll('.mode-toggle input[type="radio"]');
const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

toggleBtn.forEach(radio => {
	radio.addEventListener("change", e => {
		const radioBtn = e.currentTarget;
		radioBtn.id == "dark" ? document.documentElement.classList.add("darkmode") : document.documentElement.classList.remove("darkmode");
	});
});

colorSchemeMedia.addEventListener("change", e => {
	const darkToggle =  Array.prototype.find.call(toggleBtn, toggle => toggle.id == "dark");

	if(e.matches){
		document.documentElement.classList.add("darkmode");
		darkToggle.checked = true;
	}else{
		document.documentElement.classList.remove("darkmode")
		darkToggle.checked = false;
	}
});

function removeLetter(){
	const tileIndex = tileBoxes.dataset.letters.length - 1;
	tileBoxes.dataset.letters = tileBoxes.dataset.letters.slice(0, -1);
	tileBoxes.children[tileIndex].dataset.state = "empty";
	tileBoxes.children[tileIndex].firstElementChild.textContent = "";
}

function addLetter(inputLet){
	const tileIndex = tileBoxes.dataset.letters.length;
	tileBoxes.children[tileIndex].firstElementChild.textContent = inputLet;
	tileBoxes.dataset.letters += inputLet;
	tileBoxes.children[tileIndex].dataset.state = "added"
	tileBoxes.children[tileIndex].classList.add('pop-in');
	setTimeout(() => {
		tileBoxes.children[tileIndex].classList.remove("pop-in");
	}, 105)
}

function checkWord(){
	for(let i=0; i < 5; i++){
		rowLettersChecking(i, tileBoxes);
	}
}

function returnState(index){
	const guessLetter = guessWord.toUpperCase();
	const guessedWord = tileBoxes.dataset.letters;

	if(guessedWord[index] == guessLetter[index]){
		return "found";
	}else{
		return  guessLetter.indexOf(guessedWord[index]) > -1 ? "misplaced" : "absent";
	}
}

function tileState(letterState, state){
	letterState.classList.add("flip-in");
		setTimeout(() => {
			letterState.dataset.state = state;
			letterState.classList.remove("flip-in");
			letterState.classList.add("flip-out");
		}, 250);
	setTimeout(() => letterState.classList.remove("flip-out"), 1250);
}

function checkWin(indexOfTile){
	if(guessWord.toUpperCase() === tileBoxes.dataset.letters){
		winMsg();
	}else if (tilesRow + 1 > 6) {
		tileBoxes = null;
		setTimeout(() => {
			alert("You ran out of guesses. The correct answer was " + guessWord);
		}, 1000);
	}else{
		updateRow();
	}
}

function rowLettersChecking(tileIndex, rowTiles){
	setTimeout(() => {
		tileState(rowTiles.children[tileIndex], returnState(tileIndex));
		tileIndex == 4 && checkWin();
	}, 250 * tileIndex);
}

function winMsg(){
	for(let i = 0; i < 5; i++){
		setTimeout(() => {
			tileBoxes.children[i].classList.add("leap");
			i == 4 ? tileBoxes = null: "";
		}, 250 * i);
	}
}

function updateRow(){
	++tilesRow;
	tileBoxes = document.querySelector(`#tiles${tilesRow}`);
}