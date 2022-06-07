// Challenge 1
function ageInDay() {
  var birthyear = prompt("What is your birth year?");
  var ageDay = (2020 - birthyear) * 365;
  var h2 = document.createElement("h2");
  var text = document.createTextNode("Your age is " + ageDay + " Days");
  h2.setAttribute("id", "ageInDay");
  h2.appendChild(text);
  document.getElementById("flex-box-result").appendChild(h2);
}
function reset() {
  document.getElementById("ageInDay").remove();
}

// Challenge 2

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

// challenge 3

function rpsGame(YourChoice) {
  var humanChoice, botChoice;
  humanChoice = YourChoice.id;
  botChoice = randomRPS(randomInt());

  // console.log(typeof(botChoice))
  console.log("bot " + botChoice, "human " + humanChoice);
  result = decideWinner(humanChoice, botChoice);
  console.log(result);
  message = finalMsg(result);
  console.log(message);
  RPSFrontEnd(YourChoice.id, botChoice, message);
}

function randomInt() {
  var number = Math.floor(Math.random() * 3);
  return number;
}
function randomRPS(number) {
  var RPS = ["rock", "paper", "scissors"];
  return RPS[number];
}

function decideWinner(YourChoice, computerChoice) {
  var RPSDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { rock: 0, paper: 1, scissors: 0.5 },
  };
  var yourscore = RPSDatabase[YourChoice][computerChoice];
  var botScore = RPSDatabase[computerChoice][YourChoice];
  return [botScore, yourscore];
}

function finalMsg([yourscore, botScore]) {
  if (yourscore === 0) {
    return { msg: "You Lost", color: "red" };
  } else if (yourscore === 0.5) {
    return { msg: "Its Tie ", color: "Yellow" };
  } else {
    return { msg: "You Won !!! ", color: "Green" };
  }
}

function RPSFrontEnd(humanImageChoice, botImageChoice, finalMsg) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };

  //removing first frontend

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  // showing images that we picked by creating div
  var Humandiv = document.createElement("div");
  var botdiv = document.createElement("div");
  var messagediv = document.createElement("div");

  Humandiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    " 'height =150 width=150> ";
  botdiv.innerHTML =
    "<img src='" + imageDatabase[botImageChoice] + " 'height =150 width=150> ";
  messagediv.innerHTML =
    "<h1 style = 'color:" +
    finalMsg["color"] +
    "; font-size:60px; padding:30px;'>" +
    finalMsg["msg"] +
    "</h1>";

  document.getElementById("flex-box-container-1").appendChild(Humandiv);
  document.getElementById("flex-box-container-1").appendChild(messagediv);
  document.getElementById("flex-box-container-1").appendChild(botdiv);
}

// Challenge 4 change Color of Buttons

// collect all buttons
var all_btn = document.getElementsByTagName("button");

// remembering Original color

var copy_all_btn = [];

for (let i = 0; i < all_btn.length; i++) {
  copy_all_btn.push(all_btn[i].classList[1]);
}
console.log(copy_all_btn);

function buttonColorChange(btn_select) {
  console.log("starting");
  console.log(btn_select.value);

  if (btn_select.value === "red") {
    buttonRed();
  } else if (btn_select.value === "green") {
    buttonGreen();
  } else if (btn_select.value === "reset") {
    buttonReset();
  } else if (btn_select.value === "random") {
    buttonRandom();
  }
}
function buttonRed() {
  for (let i = 0; i < all_btn.length; i++) {
    all_btn[i].classList.remove(all_btn[i].classList[1]);
    all_btn[i].classList.add("btn-danger");
    console.log("done");
  }
}
function buttonGreen() {
  for (let i = 0; i < all_btn.length; i++) {
    all_btn[i].classList.remove(all_btn[i].classList[1]);
    all_btn[i].classList.add("btn-success");
    console.log("done");
  }
}

function buttonReset() {
  for (let i = 0; i < all_btn.length; i++) {
    all_btn[i].classList.remove(all_btn[i].classList[1]);
    all_btn[i].classList.add(copy_all_btn[i]);
    console.log("done");
  }
}

function buttonRandom() {
  let choice = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];
  for (let i = 0; i < all_btn.length; i++) {
    let random = Math.floor(Math.random() * 4);
    console.log(random);
    all_btn[i].classList.remove(all_btn[i].classList[1]);
    all_btn[i].classList.add(choice[random]);
  }
}

// challenge 5

let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "Q", "J", "A"],
  cardMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  wins: 0,
  loss: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("./blackjack_assets/sounds/swish.m4a");
const winSound = new Audio("./blackjack_assets/sounds/cash.mp3");
const lostSound = new Audio("./blackjack_assets/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand")
  .addEventListener("click", Dealerlogic);
document
  .querySelector("#blackjack-deal")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    // console.log(DEALER['score'])
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}
function showCard(Randomcard, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImg = document.createElement("img");
    cardImg.src = ` ./blackjack_assets/images/${Randomcard}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImg);
    hitSound.play();
  }
}
function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    // showResult(computeWinner());

    let YourCardImg = document
      .querySelector(YOU["div"])
      .querySelectorAll("img");
    let DealerCardImg = document
      .querySelector(DEALER["div"])
      .querySelectorAll("img");

    for (let i = 0; i < YourCardImg.length; i++) {
      YourCardImg[i].remove();
    }
    for (let i = 0; i < DealerCardImg.length; i++) {
      DealerCardImg[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#main-result").textContent = "let's play";
    document.querySelector("#main-result").style.color = "#000000";
    blackjackGame["isStand"] = false;
    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, activePlayer) {
  // if adding 11 keeps me below 21 add 11 otherwise add 1
  if (card == "A") {
    if (activePlayer["score"] + blackjackGame["cardMap"]["A"][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardMap"]["A"][1];
    } else {
      activePlayer["score"] += blackjackGame["cardMap"]["A"][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardMap"][card];
  }
}
function showScore(activePlayer) {
  if (activePlayer["score"] >= 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST !!!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function Dealerlogic() {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

// compute winner and return who just won
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    // higher score than dealer or or or or  dealer is brust
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      console.log("You Won");
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"] && DEALER["score"]) {
      blackjackGame["loss"]++;
      console.log("You lost");
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
      console.log("YOU drew");
    }
  } else if (YOU["score"] >= 21 && DEALER["score"] <= 21) {
    blackjackGame["loss"]++;
    console.log("You lost");
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
    console.log("You Drew");
  }
  console.log("winner is ", winner);
  console.log("Your Score ", YOU["score"]);
  console.log("Dealer Score ", DEALER["score"]);
  return winner;
}

function showResult(winner) {
  let msg, msgColor;
  if (winner === YOU) {
    document.querySelector("#win").textContent = blackjackGame["wins"];
    msg = "You won !!";
    msgColor = "green";
    winSound.play();
  } else if (winner === DEALER) {
    document.querySelector("#loss").textContent = blackjackGame["loss"];
    msg = "You lose !!";
    msgColor = "red";
    lostSound.play();
  } else {
    document.querySelector("#draw").textContent = blackjackGame["draws"];
    msg = "You drew !!";
    msgColor = "black";
  }
  document.querySelector("#main-result").textContent = msg;
  document.querySelector("#main-result").style.color = msgColor;
}
