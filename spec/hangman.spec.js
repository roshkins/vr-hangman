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
    describe("grades correct guesses", () => {
      beforeEach(() => {
        hangman.guessLetter("a");
      });
      it("adds a correct letter to the correct letters set", () => {
        expect(hangman.correctLetters.has("a")).toBe(true);
      });
      it("doesn't add a correct letter to the incorrect letter set", () => {
        expect(hangman.incorrectLetters.has("a")).not.toBe(true);
      });
      it("doesn't remove a guess if the guess is correct", () => {
        expect(hangman.guessesRemaining).toBe(6);
      });
      it("wins the game if all letters are correctly guessed", () => {
        ["e", "x", "a", "m", "p", "l", "e"].forEach((letter) => hangman.guessLetter(letter));
        expect(hangman.gameOver).toBe(true);
        expect
      });
    });
    describe("grades incorrect guesses", () => {
      beforeEach(() => {
        hangman.guessLetter("z");
      });
      it("doesn't an incorrect letter to the correct letters set", () => {
        expect(hangman.correctLetters.has("z")).not.toBe(true);
      });
      it("adds an incorrect letter to the incorrect letter set", () => {
        expect(hangman.incorrectLetters.has("z")).toBe(true);
      });
      it("removes a guess if it is incorrect", () => {
        expect(hangman.guessesRemaining).toBe(5);
      });
      it("doesn't remove a guess if it is incorrect and already removed", () => {
        hangman.guessLetter("z");
        expect(hangman.guessesRemaining).toBe(5);
      });
      it("sets gameOver to true if zero guesses left", () => {
        hangman.guessLetter("q");
        hangman.guessLetter("w");
        hangman.guessLetter("r");
        hangman.guessLetter("t");
        hangman.guessLetter("y");
        expect(hangman.gameOver).toBe(true);
      });
    });
  });
});
