const grid = document.querySelector('.grid')
const displayResult = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let aliensRemoved = []
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))
let direction = 1
let inavdersId
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    , 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {

        squares[alienInvaders[i]].classList.remove('invader')
    }
}
draw()

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    switch (e.key) {
        case 'ArrowLeft':
            squares[currentShooterIndex].classList.remove('shooter')
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            squares[currentShooterIndex].classList.remove('shooter')
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
            break
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

let goingRight = true
function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }

    }
    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        displayResult.innerHTML = 'GAME OVER!! Your score = ' + (aliensRemoved.length)
        clearInterval(inavdersId)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length) {
            displayResult.innerHTML = 'GAME OVER!! Your score = ' + (aliensRemoved.length)
            clearInterval(inavdersId)
        }
    }
    if (aliensRemoved.length == 30) {
        displayResult.innerHTML = 'Congrats, You WON!!'
        clearInterval(inavdersId)
    }
    

}
displayResult.innerHTML = aliensRemoved.length
inavdersId = setInterval(moveInvaders, 200)

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')
        
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 120)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            displayResult.innerHTML = aliensRemoved.length +1
            aliensRemoved.push(alienRemoved)
        }
    }

    switch (e.key) {
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)