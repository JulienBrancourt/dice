export class DiceRoller {
	constructor() {
		this.rolls = [];
		this.targetValue = 4;
		this.rerollOnes = false;
		this.rerollBelow = false;
		this.bonus = 0;
	}

	roll(count) {
		this.rolls = [];
		for (let i = 0; i < count; i++) {
			let result = this.rollADice();
			let rerollResult = null;

			// Apply reroll rules
			if (
				(this.rerollOnes && result === 1) ||
				(this.rerollBelow && result < this.targetValue)
			) {
				rerollResult = this.rollADice();
			}

            // Add bonus
            //si rollResult n'est ni null ni undefined alors on prend la valeur de rerollResult, sinon on prend la valeur de result
            //ensuite on ajoutera le bonus
			const finalResult = (rerollResult ?? result) + this.bonus;

			this.rolls.push({
				original: result,
				reroll: rerollResult,
				final: finalResult,
				bonus: this.bonus,
			});
		}
		return this.rolls;
	}

	rollADice() {
		return Math.floor(Math.random() * 6) + 1;
	}

	getResults() {
		const below = this.rolls.filter((roll) => roll.final < this.targetValue);
		const above = this.rolls.filter((roll) => roll.final >= this.targetValue);
		return { below, above };
	}
}
