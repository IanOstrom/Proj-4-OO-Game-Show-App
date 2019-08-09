/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
        this.$parent = $('#phrase ul');
    }

    /**
     * Creates html to display the phrase.
     */
    addPhraseToDisplay(){
        for (let character of this.phrase) {
            let characterHTML = '';
            if (character === ' ') {
                characterHTML = `<li class="space"> </li>`;
            } else {
                characterHTML = `<li class="hide letter ${character}">${character}</li>`;
            }
            this.$parent.append(characterHTML);
        }
    }

    /**
     * Checks to see if the letter selected by the player matches a letter in the phrase.
     */
    checkLetter(letter){
        return this.phrase.includes(letter);
    }

    /**
     * Reveals the letter(s) on the board that matches the player's selection.
     * @param {string} letter - The letter chosen by the player.
     */
    showMatchedLetter(letter){
        this.$parent.find(`.${letter}`).removeClass('hide').addClass('show');
    }
}