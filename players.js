function Color(enabledColor, disabledColor, neighbourColor) {
	this.enabledColor = enabledColor;
	this.disabledColor = disabledColor;
	this.neighbourColor = neighbourColor;
}

function Player(name, color) {
	this.name = name;
	this.color = color;
}

var red = new Color('#FF0000', '#F78181', '#FA5858');
var blue = new Color('#045FB4', '#81BEF7', '#2E9AFE');
var green = new Color('#04B431', '#81F79F', '#00FF40');

human = new Player('human', red)
machine1 = new Player('machine_1', blue)
machine2 = new Player('machine_2', green)
var players = [
	human,
	machine1,
	machine2
];

var turn = human;

function randomPlayer() {
	return players[Math.floor(Math.random()*players.length)];
}

function endTurn() {
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
	reset();
	if ((/^machine/).test(turn.name)) {
	//if (turn.name=='machine') {
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
	endTurn();
}

function nextAttack() {
	var ownedLands = getLandsForOwner(turn);
	console.log('next attack '+ownedLands.length);
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