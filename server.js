// server.js
// where your node app starts

// init project
const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/words', function(request, response) {
  fetch('http://app.linkedin-reach.io/words').then(response => {
    if(response.ok) {
      return response.text();
    } else {
      throw new Error("Not a 200 response");
    }
  }).then(words => response.send(words));
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
