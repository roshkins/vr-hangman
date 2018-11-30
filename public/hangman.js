Hangman.hangman = function hangman(word) {
  this.word = word;
  this.letters = new Set(this.word.split(""));
  this.correctLetters = new Set([]);
  this.incorrectLetters = new Set([]);
  this.guessesRemaining = 6;
  this.hasWon = false;
  this.gameOver = false;
}
function Hangman(){
  return fetch("http://app.linkedin-reach.io/words").then(response => {
    if(response.ok) {
      return response.text();
    } else {
      throw new Error("Not a 200 response");
    }
  }).then((text)=>{
    const words = text.split(/\n/);
    const randomIndex = Math.floor(words.length * Math.random());
    return new Hangman.hangman(words[randomIndex].trim().toLowerCase());
  });
}
const hangman = Hangman.hangman;
//I use named functions so they show up in error traces
hangman.prototype.guessLetter = function guessLetter(letter){
  if(!letter || letter.length !== 1 || !letter.match(/[a-zA-Z]/)) throw new Error("Exactly 1 letter per guess");
  if(this.gameOver) throw new Error("Can't play after game is over");
  const normalizedLetter = letter.toLowerCase();
  if(this.letters.has(normalizedLetter)){
    this.correctLetters.add(normalizedLetter);
    if(Array.from(this.correctLetters).length === Array.from(this.letters).length) {
      this.hasWon = true;
      this.gameOver = true;
    }
  } else {
    if(!this.incorrectLetters.has(normalizedLetter)) 
    {
      this.guessesRemaining--;
      this.incorrectLetters.add(normalizedLetter);
    }
    if(this.guessesRemaining === 0) this.gameOver = true;
  }
  return {
  };
}
  hangman.prototype.getCorrectLetters = function getDisplayedWord(){
    
  }
hangman.prototype.getCorrectLetters = function getCorrectLetters() {
  return this.correctLetters;
}
hangman.prototype.getIncorrectLetters = function getIncorrectLetters() {
  return this.incorrectLetters;
}
hangman.prototype.getGuessesRemaining = function getGuessesRemaining() {
  return this.guessesRemaining;
}
hangman.prototype.getHasWon = function getHasWon() {
  return this.hasWon;
}
hangman.prototype.getHasLost = function getHasLost() {
  return !this.hasWon && this.gameOver;
}
module.exports = Hangman;
