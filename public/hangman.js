function Hangman() {
  this.chooseWord().then((word) => {
    this.word = word;
    this.letters = new Set(this.word.split(""));
    this.loading = false;
  });
  this.correctLetters = new Set([]);
  this.incorrectLetters = new Set([]);
  this.guessesRemaining = 6;
  this.hasWon = false;
  this.gameOver = false;
  this.loading = true;
}
Hangman.prototype.chooseWord = function chooseWord(){
  return fetch("http://app.linkedin-reach.io/words").then(response => {
    if(response.ok) {
      return response.text();
    } else {
      throw new Error("Not a 200 response");
    }
  }).then((text)=>{
    const words = text.split(/\n/);
    const randomIndex = Math.floor(words.length * Math.random());
    return words[randomIndex].trim();
  });
}

Hangman.prototype.guessLetter = function guessLetter(letter){
  if(letter.length !== 1) throw new Error("Exactly 1 letter per guess");
}

module.exports = Hangman;
