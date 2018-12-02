/* global Howl Hangman */
var jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  autoplay: true,
  loop: true,
});

function* runGame() {
Hangman().then(round => {
  while(!round.getGameOver()){
    const guess = yield;
    const result = round.guessLetter(guess);
    
  }
  if(result.hasWon) {
  alert("You won!");
  } else {
    alert("You lost :(");
  }
});
}

const game = runGame();

function processGuess(letter) {
  game.next(letter);
}

if (typeof annyang !== "undefined") {
  const commands = {};
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => commands[letter] = () => processGuess(letter));
  
}