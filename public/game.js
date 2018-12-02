/* global Howl Hangman annyang*/
var jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  autoplay: true,
  loop: true,
});
function updateEntityText(entityId, text) {
  document.querySelector(`#${entityId}`).setAttribute('text-geometry', {
    value: text,
  });
}
let round = null;
// initialize hangan to empty array
(async function loadHangman() {
  round = await Hangman();
  updateEntityText('word', (new Array(round.word.length)).fill("_").join(""));
})();
function* runGame() {
  if(typeof round === "undefined") return;
  while(!round.getGameOver()){
    const result = round.guessLetter(yield);
    console.log(result);
    updateEntityText('wrong', `Incorrect: ${result.incorrectGuesses.join(" ")}`);
    document.querySelector('#skybox').scale.set(1, 1+result.incorrectGuesses.length, 1);
    updateEntityText('guesses', `Guesses: ${result.guessesRemaining}`);
    updateEntityText('word', result.displayedWord);
    if(result.hasWon) {
      alert("You won!");
    } else if (result.hasLost) {
      alert(`You lost :( The word was: ${round.word}`);
      updateEntityText('word', round.word);
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
