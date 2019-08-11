/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = [
            'live long and prosper', 
            'Charlie and the Chocolate Factory', 
            'The Empire State Building', 
            'make love not war',
            'I have a dream',
            'my precious',
            'if you build it he will come',
            'Houston we have a problem'
        ];
        this.activePhrase = null;
    }

    /**
     * Resets the game if needed: removes phrase from html, enables all key buttons, resets all heart images.
     * Hides the game overlay and starts the game by displaying the first random phrase.
     */
    startGame(){
        // Reset the game
        if (! $('#overlay').hasClass('start') ) {
            $('#phrase ul').html('');
            $('.keyrow button').removeClass('chosen wrong').addClass('key');
            $('#scoreboard img').attr('src', 'images/liveHeart.png');
        }

        // Start the game
        this.animateCSS('#overlay', 'hinge', this.hideOverlay);
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Chooses a phrase at random and uses it to instantiate a new phrase object.
     * @returns {object} Phrase
     */
    getRandomPhrase(){
        return new Phrase(this.phrases[Math.floor(Math.random() * this.phrases.length)]);
    }

    /**
     * Changes the chosen keyboard letter color to chosen or wrong.
     * If the correct letter, checks for win.
     * If not, removes a life and animates the loss of heart.
     * @param {string} letter 
     */
    handleInteraction(letter){
        const $button = $(`.keyrow button:contains(${letter})`);

        if ($button.hasClass('key')){
            $button.removeClass('key');

            if (this.activePhrase.checkLetter(letter)) {
                $button.addClass('chosen');
                this.activePhrase.showMatchedLetter(letter);
                if (this.checkForWin()) {
                    this.gameOver(true);
                }
            } else {
                $button.addClass('wrong');
                this.animateCSS('#scoreboard', 'flash');
                this.removeLife();
            }
        }
    }

    /**
     * Removes a life when the player guesses a wrong letter.
     * Changes a heart to a lost heart.
     * Calls gameover() when all 5 hearts are lost.
     */
    removeLife(){
        $('#scoreboard ol').children().each((index, element) => {
            if (this.missed === index) {
                $(element).children().attr('src', 'images/lostHeart.png');
            }
        });

        this.missed += 1;

        if (this.missed > 4) {
            this.gameOver(false);
        }
    }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase.
     * @returns {boolean}
     */
    checkForWin(){
        return ! $('#phrase ul').children().hasClass('hide');
    }

    /**
     * Shows the game overlay with an appropriate win/loss message.
     * @param {boolean} isWinner 
     */
    gameOver(isWinner){
        $('#overlay').show().removeClass('start');

        if (isWinner) {
            $('#overlay h1').text('You win!');
            $('#overlay').addClass('win');
        } else{
            $('#overlay h1').text('You lose!');
            $('#overlay').addClass('lose');
        }
    }

    /**
     * Adds Animate.css animations to html elements objects and removes them when the animation is complete.
     * Taken from https://github.com/daneden/animate.css
     * @param {string} element 
     * @param {string} animationName 
     * @param {Function} callback       Optional callback function
     */
    animateCSS(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)
    
        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)
    
            if (typeof callback === 'function') callback()
        }
    
        node.addEventListener('animationend', handleAnimationEnd)
    }

    /**
     * Callback function to hide the overlay after the animation is complete.
     */
    hideOverlay(){
        $('#overlay').hide();
    }
}

