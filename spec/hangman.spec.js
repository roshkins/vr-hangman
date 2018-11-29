/* globals spyOn, fetch */
const Hangman = require('../public/hangman.js');
let hangman = null;
describe("hangman", () => {
  beforeEach(()=>{
    hangman = new Hangman.hangman('example');
  });
  it("exists as an object", () => {
    expect(typeof hangman).toBe("object");
  });
  it("loads a random word", (done) => {
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
    Hangman().then((hangman) => {
      expect(typeof hangman.word).toBe("string"); 
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
      expect(() => hangman.guessLetter("a")).not.toThrowError("Can't play after game is over");
      hangman.gameOver = true;
      expect(() => hangman.guessLetter("a")).toThrowError("Can't play after game is over");
    });
    it("verifies a correct letter", () => {
      hangman.guessLetter("a");
      expect(hangman.correctLetters.has("a")).toBe(true);
      expect(hangman.incorrectLetters.has("a")).toBe(false);
    });
  });
});
