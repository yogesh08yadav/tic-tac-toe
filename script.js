const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset-btn');
const result = document.querySelector('.result');
let xTurn = true;
let correctCombination;
let boxes;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createGrid() {
  for (let i = 0; i < 9; i++) {
    let div = document.createElement('div');
    div.classList.add('box');
    div.addEventListener('click', handleClick, { once: true });
    container.appendChild(div);
  }
}
createGrid();
boxes = document.querySelectorAll('.box');

function handleClick(e) {
  const currentBox = e.target;
  if (xTurn) {
    currentBox.innerHTML = 'X';
    xTurn = false;
  } else {
    currentBox.innerHTML = 'O';
    xTurn = true;
  }

  let currentSelection = currentBox.innerHTML;
  const win = checkWinOrNot(currentSelection);
  console.log(win);
  if (win) {
    gameOver('win', currentSelection);
    correctCombination.every(
      (item) => (boxes[item].style.backgroundColor = 'coral')
    );
  } else if (gameDraw()) {
    gameOver('draw');
  }
}
console.log([...boxes]);
function gameDraw() {
  return [...boxes].every(
    (box) => box.innerHTML == 'X' || box.innerHTML == 'O'
  );
}

function gameOver(type, currentSelection) {
  if (type === 'win') {
    result.innerHTML = currentSelection + ' wins the game';
  } else {
    result.innerHTML = 'Match Draw';
  }
  container.style.pointerEvents = 'none';
  resetBtn.classList.add('show');
}

function checkWinOrNot(currentSelection) {
  return winningCombinations.some((combination) => {
    correctCombination = combination;
    return combination.every(
      (item) => boxes[item].innerHTML === currentSelection
    );
  });
}

resetBtn.addEventListener('click', () => {
  container.innerHTML = '';
  xTurn = true;
  result.innerHTML = '';
  resetBtn.classList.remove('show');
  container.style.pointerEvents = 'unset';
  for (let i = 0; i < 9; i++) {
    // boxes[i].removeEventListener('click', handleClick);
    // boxes[i].innerHTML = '';
  }
  createGrid();
  boxes = document.querySelectorAll('.box');
});
