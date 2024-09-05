let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector(".new");
let resetbtn = document.querySelector(".reset");
let hide = document.querySelector(".hide");

let turnO = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let win = checkWinner();

    if (count === 9 && !win) {
      draw();
    }
  });
});

const checkWinner = () => {
  for (pattern of winPattern) {
    let pos0 = boxes[pattern[0]].innerText;
    let pos1 = boxes[pattern[1]].innerText;
    let pos2 = boxes[pattern[2]].innerText;

    if (pos0 != "" && pos1 != "" && pos2 != "") {
      if (pos0 === pos1 && pos1 === pos2) {
        showWinner(pos0);
        return true;
      }
    }
  }
  return false;
};

const showWinner = (pos0) => {
  msg.innerText = `Congratulations, Winner is ${pos0}`;
  hide.classList.remove("hide");
  disablebox();
};

const disablebox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const draw = () => {
  msg.innerText = "It is a draw";
  hide.classList.remove("hide");
  disablebox();
};

const reset = () => {
  turnO = true;
  count = 0;
  enablebox();
  hide.classList.add("hide");
};

resetbtn.addEventListener("click", reset);
newbtn.addEventListener("click", reset);
