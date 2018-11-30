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
hangman.prototype.guessLetter = function guessLetter(letter){
  if(!letter || letter.length !== 1 || !letter.match(/[a-zA-Z]/)) throw new Error("Exactly 1 letter per guess");
  if(this.gameOver) throw new Error("Can't play after game is over");
  const normalizedLetter = letter.toLowerCase();
  if(this.letters.has(normalizedLetter)){
    this.correctLetters.add(normalizedLetter);
  } else {
    if(!this.incorrectLetters.has(normalizedLetter)) 
    {
      this.guessesRemaining--;
      this.incorrectLetters.add(normalizedLetter);
    }
    if(this.guessesRemaining === 0) this.gameOver = true;
  }
}

hangman.prototype.getCorrectLetters = function getCorrectLetters() {
  
}
module.exports = Hangman;
