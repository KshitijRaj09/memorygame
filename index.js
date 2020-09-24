const cards = document.querySelectorAll('.memory-card');

let isFlipped = false; //To check first card Flipped
let firstCard, secondCard; //Declare first and Second card.
let lockBoard = false; //Prevent to turned two sets of cards
let numberOfFlips = 0; //Count number of Flip occurs
let isTimerstart = true;
let cardMatched = 0;

//flip clicked cards
function flipCard() {

    if (isTimerstart) {
        gameTimer()
        isTimerstart = false;
    }
    if (this === firstCard) return; //Prevent same card clicked twice

    if (lockBoard) return;

    this.classList.add("flip"); //Add Flip class

    if (!isFlipped) { //Check card is firstCard or secondCard
        functionFlip(); //call Count number of Flips
        isFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    functionFlip(); //call Count number of Flips
    checkCardMatch(); //Call match function

}

// Function to check both cards are equal or not ?
const checkCardMatch = () => {
    firstCard.dataset.attached === secondCard.dataset.attached ? disableCardFlip() : unFlipcard();
}
//Function to remove flipCard event to prevent more flips if cards are matched
const disableCardFlip = () => {
    firstCard.removeEventListener('click', flipCard); //Remove event flipcard from firstCard and secondCard
    secondCard.removeEventListener('click', flipCard);
    cardMatched++; //Checks all cards matched

    resetBoard(); // call to reset the board
}

//UnFlip the cards if cards doesn't match after 1 second
const unFlipcard = () => {
    lockBoard = true; //lockBoard to prevent two sets of cards

    setTimeout(() => { //setTimeout function to set 1 second time to flip card back
        firstCard.classList.remove('flip'); //Remove class flip set it to back state
        secondCard.classList.remove('flip'); //Remove class flip set it to back state
        resetBoard(); // call to reset the board
    }, 1250);
}

//To count the Flips
const functionFlip = () => {
    numberOfFlips++; // Count number of flips occurred
    document.querySelector('.total-flip').innerHTML = numberOfFlips;
}

//To reset after one round
const resetBoard = () => {
    [isFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// TO calculate time
const gameTimer = () => {
    let [minute, seconds] = [0, 0];
    let timer = setInterval(() => {
        document.querySelector(".game-time").innerHTML = seconds++;
        if (cardMatched >= 8) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

//function to Shuffle the cards
(function shuffleCard(){
     cards.forEach(card => card.style.order= Math.floor(Math.random()*16));
 })();

 //To display message Game Over
const gameOver = () =>{
    document.querySelector('.game-result').style.visibility="visible";
}

// Adding Flip class to all Cards 
cards.forEach(card => card.addEventListener('click', flipCard));