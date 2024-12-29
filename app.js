import { DiceRoller } from "./diceRoller.js";

const diceRoller = new DiceRoller();

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
	const { below, above } = diceRoller.getResults();

	const belowContainer = document.getElementById("below");
	const aboveContainer = document.getElementById("above");

	belowContainer.innerHTML = "<h2>Raté</h2>";
	aboveContainer.innerHTML = `<h2>Réussi (${above.length}/${above.length + below.length})</h2>`;

	below.forEach((roll) => belowContainer.appendChild(createDiceDisplay(roll)));
	above.forEach((roll) => aboveContainer.appendChild(createDiceDisplay(roll)));
}

function setupUI() {
	document.querySelector("#app").innerHTML = `
    <div class="controls">
      <div>
        <label>Nombre de dés :</label>
        <input type="number" id="diceCount" value="5" min="1" max="100">
      </div>
      <div>
        <label>Résultat cible :</label>
        <input type="number" id="targetValue" value="4" min="1" max="6">
      </div>
      <div>
        <label>Bonus :</label>
        <input type="number" id="bonus" value="0" min="0" max="5">
      </div>
      <button id="rollButton">Roll Dice</button>
    </div>
    
    <div class="options">
      <label>
        <input type="checkbox" id="rerollOnes">
        Relance des 1
      </label>
      <label>
        <input type="checkbox" id="rerollBelow">
        Relance des échecs
      </label>
    </div>
    
    <div class="dice-container">
      <div id="below" class="dice-column"></div>
      <div id="above" class="dice-column"></div>
    </div>
  `;

	// Event listeners
	document.getElementById("rollButton").addEventListener("click", () => {
		const count = parseInt(document.getElementById("diceCount").value);
		diceRoller.targetValue = parseInt(
			document.getElementById("targetValue").value
		);
		diceRoller.bonus = parseInt(document.getElementById("bonus").value);
		diceRoller.rerollOnes = document.getElementById("rerollOnes").checked;
		diceRoller.rerollBelow = document.getElementById("rerollBelow").checked;

		diceRoller.roll(count);
		updateResults();
	});
}

setupUI();
