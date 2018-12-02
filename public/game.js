/* global Howl Hangman annyang webkitSpeechRecognitionError*/
const jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  loop: true,
  volume: 0.1
});
const splash = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2FVideo_Game_Splash-Ploor-699235037.mp3?1543718141870']
});
const applause = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2FAuditorium%20Applause-SoundBible.com-280911206.mp3?1543783135096']
});
function updateEntityText(entityId, text) {
  document.querySelector(`#${entityId}`).setAttribute('text-geometry', {
    value: text,
  });
}
function* runGame(round) {
  if(typeof round === "undefined") return;
  while(!round.getGameOver()){
    const result = round.guessLetter(yield);
    console.log(result);
    updateEntityText('wrong', `Incorrect: ${result.incorrectGuesses.join(" ")}`);
    document.querySelector('#skybox').setAttribute('scale',`-1, ${1/(1+result.incorrectGuesses.length*2)} 1`);
    if(result.wrongGuess) {splash.play();} else {applause.play();}
    updateEntityText('guesses', `Guesses: ${result.guessesRemaining}`);
    updateEntityText('word', result.displayedWord);
    if(result.hasWon) {
      updateEntityText('instructions', "You won! Say 'New Game' to play again.");
    } else if (result.hasLost) {
      updateEntityText('instructions', "You lost. :( Say 'New Game' to play again.");
      updateEntityText('word', round.word);
    }
  }
}
let game = null;
Hangman().then(round => {
  game = runGame(round);
  updateEntityText('word', (new Array(round.word.length)).fill("_").join(""));
}
              )
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
    "New Game": () => window.location += ""
  };
  ["play", "music", "mute", "stop", "sh", "be quiet"].forEach(command => commands[command] = playMusic);
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => commands[letter] = () => processGuess(letter));
  annyang.addCallback('error', function(e) {
    if(e instanceof webkitSpeechRecognitionError && window.location.protocol !== "https:") window.location = "https://vr-hangman.glitch.me";
    // updateEntityText('instructions', e.toString() + e.message);
  });
  annyang.addCommands(commands);
  annyang.start();
} else {
  alert('RIP! You need speech recognition in your browser.');
}
