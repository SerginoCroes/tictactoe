const gameBoard = (function() {

    const boardHTML = document.querySelectorAll('.box');
    const winMatrices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let boardContent = [];
    let winner;

    boardHTML.forEach((item, index) => {
        item.addEventListener('click', () => {if(!winner){addItem(index)}});
    });

    function resetBoard(){
        winner = false;
        boardContent = ['', '', '',
                        '', '', '',
                        '', '', ''];
    }

    function addItem(pos){
        if (boardContent[pos] === ''){
            boardContent.splice(pos, 1, game.activePlayer.sign);
            displayController.updateDisplay(boardContent, boardHTML);
            game.advanceTurn();
        }
    }

    function checkWin(player){
        for (check of winMatrices){
            console.log(`checking matrix ${check} for player ${player.sign}`);

            if([boardContent[check[0]], boardContent[check[1]], boardContent[check[2]]].every(item => item === player.sign)){
                winner = true;
                return true;
            }
        }
    }

    return {resetBoard, checkWin};

})();

const displayController = (function() {

    const msgHTML = document.querySelector('#winmsg')

    function updateDisplay(boardContent, boardHTML){
        for (item in boardContent){
            boardHTML[item].innerText = boardContent[item];
        }
    }

    function displayTurn(player){
        msgHTML.innerText = `Player ${player.sign}'s turn.`;
    }

    function displayEnd(winner){
        msgHTML.innerText = winner ? `Player ${winner.sign} won!` : 'No winner!';
    }

    return {updateDisplay, displayEnd, displayTurn};

})();

function player(sign) {
    return {sign};
}

const game = (function() {

    const playerX = player('x');
    const playerO = player('o');

    let turnCounter = 0;
    let activePlayer = playerX;
    let winner;

    function initGame(){
        gameBoard.resetBoard();
        displayController.displayTurn(this.activePlayer);
    }

    function advanceTurn(){
        if(gameBoard.checkWin(this.activePlayer)){
            winner = this.activePlayer;
            displayController.displayEnd(winner);
        } else if (turnCounter === 8) {
            displayController.displayEnd(undefined);
        } else {
            turnCounter++;
            this.activePlayer = this.activePlayer === playerO ? playerX : playerO;
            displayController.displayTurn(this.activePlayer);
        }
    }

    return {initGame, advanceTurn, activePlayer};

})();

game.initGame();