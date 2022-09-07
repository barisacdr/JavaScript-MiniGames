document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0] // second div is the head and 0 is the tail

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //move outcomes
    function moveOutcomes() {
        //hitting border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left 
            (currentSnake[0] - width < 0 && direction === -width) ||// if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if eats itself
        ) {
            return clearInterval(interval) //clears the interval if an outcome happens
        }

        const tail = currentSnake.pop() //removes last indx of aray
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head

        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    //assigning keycodes
    function control(e) {
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})