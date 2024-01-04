const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:20vh; left:40vw; background-color:white; width:200px; height:100px; font-weight:bold; font-size:20px ";
    if (attempts === 6) {
      div.innerText = "GameOver";
    } else {
      div.innerText = "정답! 축하합니다";
    }
    document.body.appendChild(div);
  };

  const nextLine = () => {
    attempts += 1;
    index = 0;
    if (attempts === 6) gameover();
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("click", handleMousedown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      const keyblock = document.querySelector(
        `.keyboard-block[data-key='${입력한_글자}']`
      );

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
        keyblock.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyblock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyblock.style.background = "#787C7E";
      }
      block.style.color = "white";
      keyblock.style.color = "white";
    }

    const row = document.querySelector(`.row-${attempts}`);
    console.log(row);

    if (맞은_갯수 === 5) gameover();
    else {
      row.style =
        "animation-name: moving; animation-duration: 0.8s; animation-timing-function:ease-in-out;";
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const now = new Date();
      const later = new Date(now - startTime);
      const minutes = later.getMinutes().toString().padStart(2, "0");
      const seconds = later.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minutes}:${seconds}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handleMousedown = (event) => {
    const keyboard = event.target;
    const keyboardData = event.target.dataset.key;
    const img = event.srcElement.alt;

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (keyboard.classList.contains("keyboard-block")) {
      if (keyboardData === "BACK") handleBackspace();
      else if (index === 5) {
        if (keyboardData === "ENTER") handleEnterKey();
        else return;
      } else if (keyboardData !== "ENTER") {
        thisBlock.innerText = keyboardData;
        index += 1;
      }
    }
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleMousedown);
}

appStart();
