const gameBoard = (() => {

    const boardHTML = document.querySelectorAll('.box');
    const winMatrices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let boardContent;
    let winner;

    boardHTML.forEach((item, index) => {
        item.addEventListener('click', () => {if(!winner) addItem(index)});
    });

    const addItem = pos => {
        if (boardContent[pos] === ''){
            boardContent.splice(pos, 1, game.getActivePlayerSign());
            displayController.updateDisplay(boardContent, boardHTML);
            game.advanceTurn();
        }
    }

    const resetBoard = () => {
        winner = false;
        boardContent = ['', '', '', '', '', '', '', '', ''];
        displayController.updateDisplay(boardContent, boardHTML);
    }

    const checkWin = player => {
        for (check of winMatrices){
            if([boardContent[check[0]], boardContent[check[1]], boardContent[check[2]]].every(item => item === player.sign)){
                winner = true;
                return true;
            }
        }
    }

    return {resetBoard, checkWin};

})();

const displayController = (() => {

    const msgHTML = document.querySelector('#msg');
    const restartHTML = document.querySelector('#restart');

    const displayStart = () => {
        restartHTML.style.display = 'none';
    }

    const updateDisplay = (boardContent, boardHTML) => {
        for (item in boardContent){
            boardHTML[item].innerText = boardContent[item];
        }
    }

    const displayTurn = player => {
        msgHTML.innerText = `Player ${player.sign}'s turn.`;
    }

    const displayEnd = winner => {
        msgHTML.innerText = winner ? `Player ${winner.sign} won!` : 'No winner!';
        restartHTML.addEventListener('click', () => game.initGame());
        restartHTML.style.display = 'block';
    }

    return {displayStart, updateDisplay, displayTurn, displayEnd};

})();

const player = sign => ({sign});

const game = (() => {

    const playerX = player('x');
    const playerO = player('o');

    let turnCounter;
    let activePlayer;

    const initGame = () =>  {
        turnCounter = 0;
        activePlayer = playerX;

        gameBoard.resetBoard();
        displayController.displayTurn(activePlayer);
        displayController.displayStart();
    }

    const advanceTurn = () => {
        if (gameBoard.checkWin(activePlayer)){
            displayController.displayEnd(activePlayer);
        } else if (turnCounter >= 8) {
            displayController.displayEnd(false);
        } else {
            turnCounter++;
            activePlayer = activePlayer === playerO ? playerX : playerO;
            displayController.displayTurn(activePlayer);
        }
    }

	const getActivePlayerSign = () => {
		return activePlayer.sign;
	}

    return {initGame, advanceTurn, getActivePlayerSign};

})();

game.initGame();