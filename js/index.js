const gamesEndpoint = 'http://localhost:3000/api/v1/games'
const playersEndpoint = 'http://localhost:3000/api/v1/players'
const timerDisplay = document.querySelector('.display_time_left')


document.addEventListener('DOMContentLoaded', () => {
    getGames();
    timer(90);

});

window.addEventListener('load', () => {
    console.log('The page has fully loaded');
    let areas = document.querySelectorAll('area')


    }
);

function getGames() {
    fetch(gamesEndpoint)
    .then(res => res.json())
    .then(allGames => {
        console.log(allGames)
        allGames.data.forEach(game => {
            const gameMarkup = `
            <div data-id=${game.id}>
                <h3>${game.attributes.player.username} - ${game.attributes.score} </h3>
            </div>
            `
            document.querySelector('#games-container').innerHTML += gameMarkup
        })
    })
}
let characterCount = 0
let numOfCharacters = 5
img = document.querySelector('.spacephoto')
let score = 0 
let username 
let countdown 
let characterClick = 0


img.addEventListener("click", e => { 
    if (e.target.localName === "area") {
        let characterID = e.target.id
        let targetCharacter = e.target
        let foundSound = new Audio()
        foundSound.src = "assets/sounds/confirmation.mp3"
        foundSound.play()

        targetCharacter.parentNode.removeChild(targetCharacter) //make user unable to click same character many times

        score+=100
        updateScore() 

        characterCount++

        // console.log(characterCount)
        if (characterCount === 5) {
            //PUT SOME METHOD HERE TO END GAME
        }
    }
})

//Countdown clock
function timer(seconds) {
    const now = Date.now()
    const then = now + seconds * 1000 // taking into account milliseconds
    displayTimeLeft(seconds) // the timer waits 1 second before running. This will display the starting time and then countdown like normal

    countdown = setInterval(() => { 
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        
        //make sure timer doesn't go negative but displays 0:00
        if (secondsLeft <= -1) {
            clearInterval(countdown)
            timerDisplay.innerHTML = `<div> GAME OVER </div>`
            return;
        }

        if (characterCount === 5) {
            score+= secondsLeft * 10
            updateScore()
            clearInterval(countdown)
            timerDisplay.innerHTML = `<div> CONGRATULATIONS! </div>`
            return;
        }

        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60) //rounds down the min
    const remainder = seconds % 60 
    const display = `${minutes}:${remainder < 10 ? '0' : ''}${remainder}`
    timerDisplay.textContent = display 
}


//score
const scoreDisplay = document.querySelector('.score')
function updateScore() {
    scoreDisplay.innerHTML = `<h1>Score: ${score}</h1>`
}

//beginModal




