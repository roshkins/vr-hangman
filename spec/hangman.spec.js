const Hangman = require('../public/hangman.js');
let hangman = null;
describe("hangman", () => {
  beforeEach(()=>{
    hangman = new Hangman();
  });
  it("exists as an object", () => {
    expect(typeof hangman).toBe("object");
  });
});
