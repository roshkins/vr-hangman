/* globals spyOn, fetch */
const Hangman = require('../public/hangman.js');
fetch = function(){
  return `aa
aah
aahed
aahing
aahs
aal
aalii
aaliis
aals
aardvark`;
};
let hangman = null;
describe("hangman", () => {
  beforeEach(()=>{
    hangman = new Hangman();
  });
  it("exists as an object", () => {
    expect(typeof hangman).toBe("object");
  });
  it("chooses a random word", ()=> {
    expect(typeof hangman.chooseWord()).toBe("string"); 
  });
});
