/* global Howl Hangman */
var jamaica = new Howl({
  src: ['https://cdn.glitch.com/9eaf1f46-83c1-4126-8d77-c70ffae16f90%2Fjamaica-girl.mp3?1543539881629'],
  autoplay: true,
  loop: true,
});

const round = Hangman();

while(!round.getGameOver()){
  console.log(hangman.guess("a"));
}