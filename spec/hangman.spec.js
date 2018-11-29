/* globals spyOn, fetch */
const Hangman = require('../public/hangman.js');
fetch = function(){
  return Promise.resolve({
    ok: true, 
    text: () => `aa
aah
aahed
aahing
aahs
aal
aalii
aaliis
aals
aardvark`
  });
};
let hangman = null;
describe("hangman", () => {
  beforeEach(()=>{
    hangman = new Hangman();
  });
  it("exists as an object", () => {
    expect(typeof hangman).toBe("object");
  });
  it("chooses a random word", (done) => {
    hangman.chooseWord().then((word) => {
      expect(typeof word).toBe("string"); 
      done();
    });
  });
  describe("guess letter", () => {
    it("only allows single letters", () => {
      const letterErrorMsg = "Exactly 1 letter per guess";
      expect(() => hangman.guessLetter("")).toThrowError(letterErrorMsg);
      expect(() => hangman.guessLetter("ba")).toThrowError(letterErrorMsg);
      expect(() => hangman.guessLetter(1)).toThrowError(letterErrorMsg);
      expect(() => hangman.guessLetter(null)).toThrowError(letterErrorMsg);
      expect(() => hangman.guessLetter("A")).not.toThrowError(letterErrorMsg);
      expect(() => hangman.guessLetter("z")).not.toThrowError(letterErrorMsg);
    });
    it("doesn't let you guess if the game is over", () => {
      hangman.gameOver = true;
      expect(() => hangman.guessLetter("")).toThrowError(letterErrorMsg);
    });
  });
});
