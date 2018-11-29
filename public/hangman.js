function Hangman(word) {
  this.word = word;
  this.letters = new Set(this.word.split(""));
  this.correctLetters = new Set([]);
  this.incorrectLetters = new Set([]);
  this.guessesRemaining = 6;
  this.hasWon = false;
  this.gameOver = false;
}

Hangman.loadWord = function loadWord(){
  return fetch("http://app.linkedin-reach.io/words").then(response => {
    if(response.ok) {
      return response.text();
    } else {
      throw new Error("Not a 200 response");
    }
  }).then((text)=>{
    const words = text.split(/\n/);
    const randomIndex = Math.floor(words.length * Math.random());
    return new Hangman(words[randomIndex].trim().toLowerCase());
  });
}
Hangman.prototype.guessLetter = function guessLetter(letter){
  if(!letter || letter.length !== 1 || !letter.match(/[a-zA-Z]/)) throw new Error("Exactly 1 letter per guess");
  if(this.gameOver) throw new Error("Can't play after game is over");
  const normalizedLetter = letter.toLowerCase();
}
module.exports = Hangman;
