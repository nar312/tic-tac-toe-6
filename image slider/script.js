const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const sizeInput = document.getElementById('sizeInput');
const applySizeButton = document.getElementById('applySize');
let currentPlayer = 'X';
let boardState = [];
let cells = [];
let gridSize = 3;


function createGrid(size) {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    boardState = Array(size * size).fill(null);
    cells = [];

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell', '');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}


function handleCellClick(index) {
    if (boardState[index] || checkWinner()) return;
    cells[index].textContent = currentPlayer;
    boardState[index] = currentPlayer;

    if (checkWinner()) {
        highlightWinner();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}


function checkWinner() {
    const winningCombinations = generateWinningCombinations(gridSize);
    return winningCombinations.find(combination =>
        combination.every(index => boardState[index] === currentPlayer)
    );
}


function generateWinningCombinations(size) {
    const combinations = [];


    for (let row = 0; row < size; row++) {
        const rowCombination = [];
        for (let col = 0; col < size; col++) {
            rowCombination.push(row * size + col);
        }
        combinations.push(rowCombination);
    }


    for (let col = 0; col < size; col++) {
        const colCombination = [];
        for (let row = 0; row < size; row++) {
            colCombination.push(row * size + col);
        }
        combinations.push(colCombination);
    }


    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(i * size + i);
        diagonal2.push(i * size + (size - 1 - i));
    }
    combinations.push(diagonal1, diagonal2);

    return combinations;
}

function highlightWinner() {
    const winningCombination = checkWinner();
    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winner');
        });
    }
}


resetButton.addEventListener('click', () => {
    createGrid(gridSize);
    currentPlayer = 'X';
});


applySizeButton.addEventListener('click', () => {
    let size = parseInt(sizeInput.value, 10);
    if (isNaN(size) || size < 2) {
        alert('Please enter a valid grid size (2-6).');
        return;
    }
    size = Math.min(size, 6);
    gridSize = size;
    createGrid(gridSize);
});


createGrid(gridSize);