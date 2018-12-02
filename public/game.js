/* global Howl Hangman annyang webkitSpeechRecognitionError*/
const jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  loop: true,
  volume: 0.5
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
    document.querySelector('#skybox').setAttribute('scale',`-1, ${1/(1+result.incorrectGuesses.length)} 1`);
    if(result.wrongGuess) splash.play();
    updateEntityText('guesses', `Guesses: ${result.guessesRemaining}`);
    updateEntityText('word', result.displayedWord);
    if(result.hasWon) {
      updateEntityText('instructions', "You won! Refresh to play again.");
    } else if (result.hasLost) {
      updateEntityText('instructions', "You lost. :( Refresh to play again.");
      updateEntityText('word', round.word);
    }
  }
}
const game = runGame();
game.next();
function processGuess(letter) {
  game.next(letter);
}
function playMusic() {
  if(!jamaica.playing()) {jamaica.play();} else {
    jamaica.pause();
  }
}
if (annyang) {
  const commands = {
  };
  ["play", "music", "mute", "stop", "sh", "be quiet"].forEach(command => commands[command] = playMusic);
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => commands[letter] = () => processGuess(letter));
  annyang.addCallback('error', function(e) {
    if(e instanceof webkitSpeechRecognitionError) window.location = "https://vr-hangman.glitch.me";
    updateEntityText('instructions', e.toString() + e.message);
  });
  annyang.addCommands(commands);
  annyang.start();
} else {
  alert('RIP! You need speech recognition in your browser.');
}
