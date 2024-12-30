import { RollParam } from "./rollParam.js";

const rollParam = new RollParam();

function createDiceDisplay(roll) {
	const div = document.createElement("div");
	div.className = "dice";

	let display = `🎲 ${roll.original}`;

	if (roll.bonus) {
		display += ` (+${roll.bonus}) = ${roll.original + roll.bonus}`;
	}

	if (roll.reroll !== null) {
		display += `   ==>   ${roll.reroll}`;
		if (roll.bonus) {
			display += ` (+${roll.bonus}) = ${roll.final}`;
		}
	}

	div.textContent = display;
	return div;
}

function updateResults() {
	const { below, above } = rollParam.getResults();

	const belowContainer = document.getElementById("below");
	const aboveContainer = document.getElementById("above");

	belowContainer.innerHTML = "<h2>Raté</h2>";
	aboveContainer.innerHTML = `<h2>Réussi (${above.length}/${above.length + below.length})</h2>`;

	below.forEach((roll) => belowContainer.appendChild(createDiceDisplay(roll)));
	above.forEach((roll) => aboveContainer.appendChild(createDiceDisplay(roll)));
}


// Event listeners
document.getElementById("rollButton").addEventListener("click", () => {
	const count = parseInt(document.getElementById("diceCount").value);
	rollParam.targetValue = parseInt(
		document.getElementById("targetValue").value
	);
	rollParam.bonus = parseInt(document.getElementById("bonus").value);
	rollParam.rerollOnes = document.getElementById("rerollOnes").checked;
	rollParam.rerollBelow = document.getElementById("rerollBelow").checked;

	rollParam.roll(count);
	updateResults();
});

