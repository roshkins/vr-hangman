function Hangman(words) {
  return new Promise((resolve, reject) => { 
    this.chooseWord().then((word) => {
      this.word = word;
      this.letters = new Set(this.word.split(""));
      this.correctLetters = new Set([]);
      this.incorrectLetters = new Set([]);
      this.guessesRemaining = 6;
      this.hasWon = false;
      this.gameOver = false;
      resolve(this);
    });
  });
}

function loadWords() {
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
    return words[randomIndex].trim().toLowerCase();
  });
}
Hangman.prototype.guessLetter = function guessLetter(letter){
  if(!letter || letter.length !== 1 || !letter.matches(/[a-zA-Z]/)) throw new Error("Exactly 1 letter per guess");
  const normalizedLetter = letter.toLowerCase();
}
module.exports = Hangman;
