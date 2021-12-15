
const shapes = ["Rock", "Paper", "Scissors"]

let computerSelection;
let playerSelection;

let computerScore = 0;
let playerScore = 0;

const messages = document.querySelector('#messages');

let playerSelectionPara = document.createElement("p");	
let computerSelectionPara = document.createElement("p");
let roundResult = document.createElement("p"); 


const scores = document.querySelector('#scores');

const playerScorePara = document.createElement("p");
playerScorePara.textContent = `You: ${playerScore}`;
scores.appendChild(playerScorePara);

const computerScorePara = document.createElement("p");
computerScorePara.textContent = `Computer: ${computerScore}`;
scores.appendChild(computerScorePara);

const buttons = document.querySelectorAll('button');

const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')


function capitalize(text) {
	return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

//Computer randomly selects a shape
function computerPlay() {
	let random = Math.floor(Math.random() * shapes.length);
	return(shapes[random]);
}

//Plays one round
function playRound(computerSelection, playerSelection) {

	computerSelection = computerPlay();

	playerSelectionPara.textContent = `You selected: ${playerSelection}`;
	messages.appendChild(playerSelectionPara);

	computerSelectionPara.textContent = `The computer selected: ${computerSelection}`;
	messages.appendChild(computerSelectionPara);

	if (computerSelection == playerSelection) {
		roundResult.textContent = "It's a tie!";
		messages.appendChild(roundResult);
	} else if (
		(computerSelection == "Rock" && playerSelection == "Scissors") ||
		(computerSelection == "Paper" && playerSelection == "Rock") ||
		(computerSelection == "Scissors" && playerSelection == "Paper")
		) {
		computerScore++;
		roundResult.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
		messages.appendChild(roundResult);
	} else {
		playerScore++;
		roundResult.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
		messages.appendChild(roundResult);
	}	
}

function updateScore() {
	playerScorePara.textContent = `You: ${playerScore}`;
	computerScorePara.textContent = `Computer: ${computerScore}`;
}

function restartGame() {
	endgameModal.classList.remove("active");
	overlay.classList.remove("active");
	messages.textContent = "";
	playerScore = 0;
	computerScore = 0;
	updateScore();
}


buttons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.id === "restartBtn") {
			restartGame();
		} else {
			playerSelection = capitalize(button.id);
			playRound(computerSelection, playerSelection);
			updateScore();
		}
		if (playerScore === 3 || computerScore === 3) {
			endgameModal.classList.add("active");
			overlay.classList.add("active");
			if (playerScore > computerScore) {
				endgameMsg.textContent = "You win! Mankind lives another day!";
			} else {
				endgameMsg.textContent = "You lost! Mankind is doomed!";
			}
		}
	})
})
