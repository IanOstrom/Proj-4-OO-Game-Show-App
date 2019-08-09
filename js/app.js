/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

 /**
  * Starts the game when the start button is pressed.
  */
 $('#btn__reset').click(() => {
    game = new Game();
    game.startGame();
});

/**
 * Allows player to choose a letter via on screen letter buttons.
 */
$('.keyrow').on('click', 'button', (e) =>{
    game.handleInteraction($(e.target).text());
});

/**
 * Allows player to choose a letter using the keyboard.
 */
$(document).on('keydown', (e) => {
    game.handleInteraction(e.key);
});