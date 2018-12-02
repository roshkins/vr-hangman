/* global Howl Hangman */
var jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  autoplay: true,
  loop: true,
});
async function* runGame() {
  const round = await Hangman();
  while(!round.getGameOver()){
    const result = round.guessLetter(yield);
    console.log(result);
    document.querySelector('wrong').setAttribute('text-geometry', {
      value: `Incorrect: ${} `,
    });
    if(result.hasWon) {
      alert("You won!");
    } else if (result.hasLost) {
      alert("You lost :(");
    }
  }
}
const game = runGame();
function processGuess(letter) {
  game.next(letter);
}
if (typeof annyang !== "undefined") {
  const commands = {};
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => commands[letter] = () => processGuess(letter));
  annyang.addCommands(commands);
  annyang.start();
}
