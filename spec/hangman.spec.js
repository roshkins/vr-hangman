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
      
    });
  });
});
