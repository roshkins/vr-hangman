# My development plan

## Goals
My first goal is to create a working hangman class version. I have 4 objectives


*  The length of the secret word is displayed to the guesser (e.g. as a set of underscores)
* As the guesser makes correct guesses, occurrences of the guessed letter in the word are shown while unknown letters are still hidden 
* The number of guesses remaining is displayed
* A list of incorrect guesses are displayed
* Your program must retrieve a dictionary list of words from the word dictionary REST API provided (see attached documentation)


## Process
I'll install jasmine to run tests, so I can unit test as I build out the hangman engine

I'll create a `hangman.js` file for handling hangman logic. This way I can use the same hangman engine for the cli interface and the VR interface.

I'll do TDD for each of the goals, ensuring all the logic exists. I'll add some of the easy nice-to-haves after I have VR working.

After hangman.js is written and tested, I'll connect the web-vr front-end to `hangman.js`. 

This will start with it being a generic background, and having text being overlayed. 

The UI will be a bunch of letters A-Z floating alphabetically in rows. As letters are used they will be greyed out. There will be spaces for the words floating about the keyboard. Above that, a list of incorrect guesses. Above that, a count of remaining guesses. 

After that works, I'll put a collection of 3d-objects 





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
