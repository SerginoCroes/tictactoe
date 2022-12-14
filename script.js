const gameBoard = (function() {

    const winMatrices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let boardContent = [];    

    function resetBoard(){
        boardContent = ['', '', '',
                        '', '', '', 
                        '', '', ''];
    }

    function addItem(pos, player){
        if (boardContent[pos] === ''){
            boardContent.splice(pos, 1, player.sign);
            displayController.updateDisplay(boardContent);
        }
    }

    function checkWin(player){
        for (check of winMatrices){
            console.log(`checking matrix ${check} for player ${player.sign}`);

            if([boardContent[check[0]], boardContent[check[1]], boardContent[check[2]]].every(item => item === player.sign)){return true};
        }
    }
    
    return {addItem, resetBoard, checkWin};

})();


const displayController = (function() {

    const boardHTML = document.querySelectorAll('.box');
    const msgHTML = document.querySelector('#winmsg')

    function updateDisplay(boardContent){
        for (item in boardContent){
            boardHTML[item].innerText = boardContent[item];
        }
    }

    function displayEnd(winner){
        msgHTML.innerText = winner ? `Player ${winner.sign} won!` : 'no winner'
    }

    return {updateDisplay, displayEnd};

})();


function player(sign) {
    return {sign};
}

 const game = (function() {

    const playerX = player('x');
    const playerO = player('o');
    
    let winner;

     function startGame() {

        gameBoard.resetBoard();
        let player = playerX;

    }  

    gameBoard.resetBoard();

    let activePlayer = playerX;


    let i = 0; //TEMP!!!!!!!

    while (!winner && i < 9){

        gameBoard.addItem(i, activePlayer);
    
        if(gameBoard.checkWin(activePlayer)){
            winner = activePlayer;
            displayController.displayEnd(winner);
        }
    
        console.log(winner);
    
        activePlayer = activePlayer === playerO ? playerX : playerO;
    
        i++;
    }



}); 


game();



/* const playerX = player('x');
const playerO = player('o');
    
let winner;

gameBoard.resetBoard();
let activePlayer = playerX;

let i = 0; //TEMP!!!!!!!

while (!winner){

    gameBoard.addItem(i, activePlayer);

    if(gameBoard.checkWin(activePlayer)){
        winner = activePlayer.sign;
    }

    console.log(gameBoard.checkWin(activePlayer));
    console.log(winner);

    activePlayer = activePlayer === playerO ? playerX : playerO;

    i++;
} */
