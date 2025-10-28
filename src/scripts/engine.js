const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score:document.querySelector('#score')
    }, 
    value: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.1
    audio.play()
}

function countDown() {
    state.value.currentTime --
    state.view.timeLeft.textContent = state.value.currentTime

    if (state.value.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(moveEnemy)
        alert("Gamer Over! Pontuação: " + (state.value.result))
    }
}

function randomSquare() {
    // Remove a classe enemy de todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })

    // Gera um número aleatório e atribui a classe enemy a ela
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.value.hitPosition = randomSquare.id
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === state.value.hitPosition) {
                state.value.result++
                state.view.score.textContent = state.value.result
                state.value.hitPosition = null
                playSound()
            }
        })
    })
}

function init() {
    moveEnemy()
    addListenerHitBox()
}

init()