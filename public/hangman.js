function Hangman() {
  this.word = this.chooseWord();
  this.correctLetters = new Set([]);
  this.incorrectLetters = new Set([]);
  this.guessesRemaining = 6;
  this.hasWon = false;
  this.gameOver = false;
}
Hangman.prototype.chooseWord = function chooseWord(){
  fetch("http://app.linkedin-reach.io/words");
}
module.exports = Hangman;
