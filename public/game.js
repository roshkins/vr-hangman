/* global Howl Hangman annyang*/
const jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  autoplay: true,
  loop: true,
});

const splash = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2FVideo_Game_Splash-Ploor-699235037.mp3?1543718141870']
});

function updateEntityText(entityId, text) {
  document.querySelector(`#${entityId}`).setAttribute('text-geometry', {
    value: text,
  });
}

async function* runGame() {
  const round = await Hangman();
  updateEntityText('word', (new Array(round.word.length)).fill("_").join(""));
  await undefined;
  if(typeof round === "undefined") return;
  while(!round.getGameOver()){
    const result = round.guessLetter(yield);
    console.log(result);
    updateEntityText('wrong', `Incorrect: ${result.incorrectGuesses.join(" ")}`);
    document.querySelector('#skybox').setAttribute('scale',`-1, ${1/result.incorrectGuesses.length} 1`);
    if(result.wrongGuess) splash.play();
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
game.next();
function processGuess(letter) {
  game.next(letter);
}
if (typeof annyang !== "undefined") {
  const commands = {
    "mute": () => jamaica.mute(true),
    "stop": () => jamaica.mute(true)
  };
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => commands[letter] = () => processGuess(letter));
  annyang.addCommands(commands);
  annyang.start();
}
