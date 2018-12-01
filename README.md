# My development plan

## How to run

`pnpm test` to run tests (in cli)


## Goals
My first goal is to create a working hangman class version. I have these objectives

### Game Rules
* At the start of the game the computer/secret-keeper will choose a dictionary word
* The guesser loses the game if they guess 6 letters that are not in the secret word
* The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

### User Interface

*  The length of the secret word is displayed to the guesser (e.g. as a set of underscores)
* As the guesser makes correct guesses, occurrences of the guessed letter in the word are shown while unknown letters are still hidden 
* The number of guesses remaining is displayed
* A list of incorrect guesses are displayed

### Implementation
* Your program must retrieve a dictionary list of words from the word dictionary REST API provided (see attached documentation)
* You can choose whichever combination of programming languages, tools, frameworks, and libraries you find appropriate within reason (e.g. you can’t use a game framework that implements Hangman)


## Process
I'll install jasmine to run tests, so I can unit test as I build out the hangman engine

I'll create a `hangman.js` file for handling hangman logic. This way I can use the same hangman engine for the cli interface and the VR interface.

I'll do TDD for each of the goals, ensuring all the logic exists. I'll add some of the easy nice-to-haves after I have VR working.

After hangman.js is written and tested, I'll connect the web-vr front-end to `hangman.js`. 

This will start with it being a generic background, and having text being overlayed. 

I'll use https://www.npmjs.com/package/aframe-gui for the UI

I'll copy some boilerplate from: https://glitch.com/edit/#!/aframe-adarose?path=public/index.html:31:14

The UI will be a bunch of letters A-Z floating alphabetically in rows, using 3d text as shown here: (https://glitch.com/edit/#!/aframe-vaporwave?path=index.html:1:0) As letters are used they will be greyed out. There will be spaces for the words floating about the keyboard. Above that, a list of incorrect guesses. Above that, a progress bar that decrements after every incorrect guess, and displays how many guesses are left.

~~After that works, I'll put a collection of 3d-objects to represent the 6 guesses next to the count, hidden after every incorrect guess. They will be dolphin CC0 models. I'll go to the water take a 360 photo of the ocean.~~

~~When you guess wrong, the dolphins will fall into the water. We'll grab a CC0 sound clip of a splash. We'll take a 15 second clip of "under the sea" and play it on loop for background music. I'll use "howlerjs" to play the music.~~

After that works, I'll make the sky a 360 image of the ocean (my photograph), with water underneath. The goal will be to not get dunked into the ocean! Each wrong guess will bring you closer to your doom, vertically. I'll do that by scaling the y axis.

Input:
https://github.com/lmalave/aframe-speech-command-component


I'll use howler.js to give "splash" sound effects when you guess wrong, a splash if you fall in, and [background music](https://www.freestockmusic.com/international-production-music/free-international-stock-music-jamaica-girl/)

Splash: http://soundbible.com/2100-Splash-Rock-In-Lake.html

Boat: https://free3d.com/3d-model/boat-37697.html
Palm tree: https://free3d.com/3d-model/date-palm-2286.html


If I get this far I'll brainstorm how to add some of the other nice-to-haves.





# Everything Below is from Glitch

Welcome to Glitch
=================

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).


Your Project
------------

On the front-end,
- edit `public/client.js`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)


Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
