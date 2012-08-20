function endTurnMachine() {
	var t = 0;
	for (var i=0; i<machineMovements.length; i++) {
		console.log('*** machi mov '+machineMovements[i].attacker.path_id+' '+machineMovements[i].attackRoll+' '+machineMovements[i].defender.path_id+' '+machineMovements[i].defendRoll);
		t += 400;
		setTimeout(applyAttackStyle, t, machineMovements[i].attacker, machineMovements[i].attackRoll);
		t += 400;
		setTimeout(applyAttackStyle, t, machineMovements[i].defender, machineMovements[i].defendRoll);
		t += 100;
		setTimeout(applyUnselectedStyle, t, machineMovements[i].attacker);
		t += 100;
		setTimeout(applyUnselectedStyle, t, machineMovements[i].defender);
	}
	t += 100;
	setTimeout(	function() {machineMovements = [];}, t);
	t += 100;
	setTimeout(endTurn, t);
}

function endTurn() {
	if (isGameOver()) {
		return;
	}

	next = nextPlayer(turn);
	console.log('end turn '+turn.name+', next turn '+next.name);
	assignNewDice(turn);
	turn = next;
	endTurnButton = document.getElementById('end-turn');
	if (turn.name!=player.name) {
		endTurnButton.disabled = true;
	} else {
		endTurnButton.disabled = false;
	}

	updateMessageBox();

	reset();
	if (turn.isMachine()) {
		console.log('machine at work');
		machineTurn();
	}
}

function nextPlayer(current) {
	for (var i=0; i<players.length; i++) {
		if (current.name == players[i].name) {
			if (i==players.length-1)
				return players[0];
			else
				return players[i+1];
		}
	}
	// si llegamos hasta aquí, chungo
	console.log('mal rollo, devolvemos '+current.name)
	return current;
}

function assignNewDice(player) {
	var ownedLands = [];
	var diceyLands = []; // lands with room for more dice
	for (var i=0; i<lands.length; i++) {
		if (lands[i].owner.name == player.name) {
			ownedLands.push(lands[i]);
			if (lands[i].current_dice < lands[i].max_dice)
				diceyLands.push(lands[i]);
		}
	}
	newDice = getBiggestCluster(player);
	console.log(newDice+' new dice for '+player.name+' dicey lands: '+diceyLands.length);

	while (newDice>0 && diceyLands.length>0) {
		var index = Math.floor(Math.random()*diceyLands.length);
		var diceyLand = diceyLands[index];
		if (diceyLand.current_dice>=diceyLand.max_dice) {
			// land got to the top dice
			diceyLands.splice(index, 1);
		} else {
			diceyLand.current_dice+=1;
			newDice-=1;
		}
	}
}

function machineTurn() {
	var move = nextAttack()
	while (move!=null) {
		//console.log('al ataque '+move.from.path_id+' '+move.to.path_id);
		attack(move.from, move.to);
		move = nextAttack()
	}
	endTurnMachine();
}

function nextAttack() {
	var ownedLands = getLandsForOwner(turn);
	for (var i=0; i<ownedLands.length; i++) {
		if (ownedLands[i].current_dice>1) {
			var neighbours = getNeighbours(document.getElementById(ownedLands[i].path_id));
			for (var j=0; j<neighbours.length; j++) {
				var neighbour = getLandForPathId(neighbours[j].id);
				if(neighbour.owner.name!=turn.name &&
					ownedLands[i].current_dice >= neighbour.current_dice) {
					return {from: ownedLands[i], to: neighbour}
				}
			}
		}
	}
	return null;
}

function isGameOver() {
	var winner = lands[0].owner;
	for (var i=0; i<lands.length; i++) {
		if (lands[i].owner!=winner) {
			return false;
		}
	}
	applyWinnerStyle(winner);
	return true;
}