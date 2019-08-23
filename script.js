var vocab = ['writing', 'letter', 'author', 'house', 'revolution'];
var word; // computer choses a word from vocab
var userWord; // what user sees
var mistakesCount; // misses count
var guess; // user guess
var miss_bool; // boolean miss is true if user's guess is incorrect
var user_input; 
var hangman_parts = document.getElementsByClassName('hangman');

function showUserWord(){
	for(let i = 0; i < word.length; i++) {
		userWord.push('_');
	}
	document.getElementById('word').innerHTML = userWord.join('').toUpperCase();
}
document.getElementById('letter').addEventListener('input', function(e) {
	guess = this.value.toLowerCase();
	if(guess != '') {
		if(guess.length > 1) {
		guess = guess.substring(0, 1);
		document.getElementById('letter').value = guess;
		}
	}
	checkGuess(guess);
	showGuesses(guess);
	if(miss_bool == true){
		countMisses();
	}
	document.getElementById('letter').value = '';
	if (userWord.join('') == word) {
		endGame('won');
	}
});
function countMisses(){
	++mistakesCount;
	hangman_parts[mistakesCount-1].style.display = 'block';
	if (mistakesCount >= 10) {
		endGame('lost');
	}
}
function showGuesses(guess){
	user_input = user_input +  guess + ', ';
	document.getElementById('user_input').innerHTML = user_input;
}
function showWord(guess){
	for(let i = 0; i < word.length; i++) {
		if(word[i] == guess){
			userWord[i] = guess;
		}
	}
	document.getElementById('word').innerHTML = userWord.join('').toUpperCase();
}
function checkGuess(guess){
	var miss = true;
	for (let i = 0; i < word.length; i++) {
		if(word[i] == guess) {
			showWord(guess);
			miss = false;
		}
		else{
			word[i] = word[i];
		}
	}
	miss_bool = miss;
}

function endGame(info_word) {
	document.getElementById('info').style.display = 'block';
	document.getElementById('info').innerHTML = `You ${info_word}! Play Again?`;
	document.getElementsByClassName('wrapper')[0].style.opacity = 0.4;
}
function playGame(){
	word = vocab[Math.floor(Math.random()*vocab.length)]; // choose a word
	showUserWord();
}
function initGame() {
	word = '';
	userWord = [];
	mistakesCount = 0;
	guess = '';
	miss_bool = true;
	user_input = 'Your input: ';
	for(let i = 0; i < hangman_parts.length; i++) {
		hangman_parts[i].style.display = 'none';
	}
	document.getElementsByClassName('wrapper')[0].style.opacity = 1;
	document.getElementById('info').style.display = 'none';
	document.getElementById('letter').value = '';
	document.getElementById('user_input').innerHTML = 'Your input: '
	playGame();
}
document.getElementById('info').addEventListener('click', function() {
	initGame();
});
initGame();



