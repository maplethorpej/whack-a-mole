# Whack-A-Mole

This codebase contains two classes: `WhackAMole` and `Mole`.

`WhackAMole` is responsible for maintaining the game's status, score and time remaining. Upon instantiating the game, 
`.mole`s in the DOM are gathered, looped through and associated with the `Mole` class. Each `Mole` is then added to the game.

`Mole` is responsible for randomly exposing/hiding the associated element and handling the click action. The `stopCycle`,
`startCycle` and `reset` methods are used for managing the mole's state both internally and by `WhackAMole`.

The Play/Pause and Reset buttons trigger corresponding events within `WhackAMole`, which triggers the appropriate events for each `Mole`.

**Note:** This project was written in es6 and then compiled into es5 (for browser compatibility) using https://babeljs.io/repl/