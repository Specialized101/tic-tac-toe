function createPlayer(name, marker) {
    return {name, marker}
}

const gameBoard = (() => {
    let board = []
    for (let i = 0; i < 9; i++)
        board.push('')
    
    let cells = document.querySelector('.cells')

    board.forEach(() => {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cells.appendChild(cell)
    })

    Array.from(cells.children).forEach((cell, index) => {
        cell.addEventListener('click', () => {
            cell.classList.add(gameController.activePlayer.marker)
            cell.setAttribute('marker', gameController.activePlayer.marker)
            cell.textContent = gameController.activePlayer.marker
            
            board[index] = gameController.activePlayer.marker
            cell.style.pointerEvents = 'none'
            gameController.playableCells--
            gameController.checkWinner()

            if (!gameController.isWinner) {
                if (gameController.playableCells > 0) {
                    gameController.alertNextPlayer()
                    gameController.nextPlayer()
                } else if (gameController.playableCells == 0){
                    console.log('Tie')
                    gameController.declareTie()
                }
            }
        })
    })

    return {board}
})();

const gameController = (() => {

    const playerOne = createPlayer('Player 1', 'X')
    const playerTwo = createPlayer('Player 2', 'O')

    let activePlayer = playerOne
    let isWinner = false
    let playableCells = 9

    let subtext = document.querySelector('.subtext')
    let playerName = document.querySelector('.player-name')

    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkWinner() {
        winningAxes.forEach(item => {
            if (gameBoard.board[item[0]] === this.activePlayer.marker
                && gameBoard.board[item[1]] === this.activePlayer.marker
                && gameBoard.board[item[2]] === this.activePlayer.marker){
                    console.log('current player won')
                    subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`
                    this.isWinner = true
                }
        })
    }

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1'
    }

    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne
        console.log(`Active Player: ${activePlayer.name}`)
    }

    function declareTie() {
        subtext.innerHTML = '<b>Tie game!</b>'
    }

    return {
        activePlayer,
        playableCells,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        isWinner
    }

})();

