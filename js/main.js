let gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let player1 = true;
let emptyCells = true;
let gameCells = document.querySelectorAll('.container__cell');
let gameEnded = false;
let modal = document.querySelector('.modal');
let textoModal = document.querySelector('.modal__title');

gameCells.forEach(cell => {
    cell.addEventListener('click', function () {
            checker(this.id);
    });
});

const checker = (id) => {

    let rowIndex = Math.floor((id - 1) / 3);
    let columnIndex = (id - 1) % 3;
    let cell = document.getElementById(id).firstElementChild;

    if (player1 && cell.textContent == "") {
        cell.textContent = "X";
        player1 = false;
        gameBoard[rowIndex][columnIndex] = 1;
    } else if (!player1 && cell.textContent == "") {
        cell.textContent = "O";
        player1 = true;
        gameBoard[rowIndex][columnIndex] = 2;
    }

    let resultado = calcularGanador(gameBoard);

    if(checkEmptyCells() && resultado == null){
        setTimeout(() => {
            textoModal.textContent = `Tie. Nobody wins`;
            modal.classList.add('modal--visible');
        }, 100); // Retraso de 100 milisegundos
    }else if(resultado !== null){
        setTimeout(() => {
            textoModal.innerHTML = `<b>Player ${resultado}</b> wins!`;
            modal.classList.add('modal--visible');                
        }, 100);
    }

};

const checkEmptyCells = () => {

    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === 0) {
                return false; // Si encuentra una celda vacía, retorna falso
            }
        }
    }
    return true; // Si no hay celdas vacías, retorna verdadero

}

function calcularGanador(gameBoard) {
    const combinacionesGanadoras = [
        // Combinaciones ganadoras horizontales
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Combinaciones ganadoras verticales
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Combinaciones ganadoras diagonales
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (
            gameBoard[a[0]][a[1]] !== 0 &&
            gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
            gameBoard[b[0]][b[1]] === gameBoard[c[0]][c[1]]
        ) {
            return gameBoard[a[0]][a[1]]; // Retorna el jugador ganador (1 o 2)
        }
    }

    return null; // No hay ganador

}

const restart = () => {
    gameCells.forEach(cell => {
        cell.firstElementChild.textContent = "";
    })
    gameBoard = [[0,0,0], [0,0,0], [0,0,0]];
    player1 = true;
    modal.classList.remove('modal--visible');
}

let restartButton = document.getElementById('controls__restart').addEventListener('click', restart);



