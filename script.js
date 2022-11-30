const gameBoard = (function() {

    const boxes = document.querySelectorAll('.box');

    boxes.forEach
    
    let boardContent = ['x', 'x', 'o',
                        'o', 'o', 'x', 
                        'x', 'o', 'x'];

    function markBoard() {

    }
    
    return {boxes, boardContent};

})();


const displayController = (function() {

    function updateDisplay(){

        gameBoard.boxes.forEach((box, index) => {

            box.innerText = gameBoard.boardContent[index];

            console.log(box);
            
            });

        }

    return {updateDisplay};

})();


const game = (function() {

    let player = 'x';

})();


function player() {

}

displayController.updateDisplay();

