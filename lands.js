function Land(path_id, label_id, current_dice, max_dice, owner) {
	this.path_id = path_id;
	this.label_id = label_id;
	this.current_dice = current_dice;
	this.max_dice = max_dice;
	this.owner = owner;
	// on, off, neighbour
	this.state = 'off';
}

var lands = [
	new Land("andalucia_path", "andalucia_label", 3, 8, randomPlayer()),
	new Land("canarias_path", "canarias_label", 3, 8, randomPlayer()),
	new Land("baleares_path", "baleares_label", 3, 8, randomPlayer()),
	new Land("murcia_path", "murcia_label", 3, 8, randomPlayer()),
	new Land("extremadura_path", "extremadura_label", 3, 8, randomPlayer()),
	new Land("castilla_la_mancha_path", "castilla_la_mancha_label", 3, 8, randomPlayer()),
	new Land("valencia_path", "valencia_label", 3, 8, randomPlayer()),
	new Land("madrid_path", "madrid_label", 3, 8, randomPlayer()),
	new Land("catalunya_path", "catalunya_label", 3, 8, randomPlayer()),
	new Land("aragon_path", "aragon_label", 3, 8, randomPlayer()),
	new Land("castilla_y_leon_path", "castilla_y_leon_label", 3, 8, randomPlayer()),
	new Land("galicia_path", "galicia_label", 3, 8, randomPlayer()),
	new Land("navarra_path", "navarra_label", 3, 8, randomPlayer()),
	new Land("la_rioja_path", "la_rioja_label", 3, 8, randomPlayer()),
	new Land("pais_vasco_path", "pais_vasco_label", 3, 8, randomPlayer()),
	new Land("cantabria_path", "cantabria_label", 3, 8, randomPlayer()),
	new Land("asturias_path", "asturias_label", 3, 8, randomPlayer()),
	new Land("ceuta_path", "ceuta_label", 3, 8, randomPlayer()),
	new Land("melilla_path", "melilla_label", 3, 8, randomPlayer())
];

var edges = [
	["andalucia_path", "canarias_path"],
	["andalucia_path", "murcia_path"],
	["andalucia_path", "extremadura_path"],
	["andalucia_path", "castilla_la_mancha_path"],
	["andalucia_path", "ceuta_path"],
	["andalucia_path", "melilla_path"],
	["ceuta_path", "melilla_path"],
	["extremadura_path", "castilla_la_mancha_path"],
	["murcia_path", "castilla_la_mancha_path"],
	["murcia_path", "valencia_path"],
	["valencia_path", "castilla_la_mancha_path"],
	["valencia_path", "baleares_path"],
	["valencia_path", "aragon_path"],
	["madrid_path", "castilla_la_mancha_path"],
	["madrid_path", "castilla_y_leon_path"],
	["catalunya_path", "baleares_path"],
	["catalunya_path", "valencia_path"],
	["catalunya_path", "aragon_path"],
	["castilla_la_mancha_path", "aragon_path"],
	["castilla_y_leon_path", "extremadura_path"],
	["castilla_y_leon_path", "castilla_la_mancha_path"],
	["castilla_y_leon_path", "aragon_path"],
	["castilla_y_leon_path", "galicia_path"],
	["castilla_y_leon_path", "la_rioja_path"],
	["castilla_y_leon_path", "pais_vasco_path"],
	["castilla_y_leon_path", "asturias_path"],
	["castilla_y_leon_path", "cantabria_path"],
	["aragon_path", "navarra_path"],
	["aragon_path", "la_rioja_path"],
	["la_rioja_path", "navarra_path"],
	["la_rioja_path", "pais_vasco_path"],
	["navarra_path", "pais_vasco_path"],
	["cantabria_path", "pais_vasco_path"],
	["cantabria_path", "asturias_path"],
	["galicia_path", "asturias_path"],
];

function getNeighbours(land) {
  var neighbours = [];
  for(var i=0; i<edges.length; i++) {
    if (land.id == edges[i][0])
      neighbours.push(document.getElementById(edges[i][1]));
    else if (land.id == edges[i][1])
      neighbours.push(document.getElementById(edges[i][0]));
  }
  return neighbours;
}

function getPathForLabel(label_id) {
	var land = null;
	for (var i=0; i<lands.length; i++) {
	  if (label_id==lands[i].label_id) {
	    return document.getElementById(lands[i].path_id);
	  }
	}
}

function getLandForPathId(path_id) {
	var land = null;
	for (var i=0; i<lands.length; i++) {
	  if (path_id==lands[i].path_id) {
	    return lands[i];
	  }
	}
}

function diceRoll(dice) {
	return Math.floor(Math.random()*dice*5) + dice;
}

function attack(attacker, defender) {
	attackRoll = diceRoll(attacker.current_dice);
	defendRoll = diceRoll(defender.current_dice);
	if (attackRoll>defendRoll) {
		msg = 'gana ' + attacker.path_id + '('+attackRoll+')'+' '+defender.path_id + '('+defendRoll+')';
		defender.current_dice = attacker.current_dice-1;
		defender.owner = attacker.owner;
		attacker.current_dice = 1;
		applyUnselectedStyle(defender);
		applyUnselectedStyle(attacker);
	} else if (attackRoll<defendRoll) {
		msg = 'gana ' + defender.path_id + '('+defendRoll+')'+' '+attacker.path_id + '('+attackRoll+')';
		attacker.current_dice = 1;
		applySelectedStyle(attacker);
	} else {
		msg = 'empate!!! ' + attacker.path_id + '('+attackRoll+')'+' '+defender.path_id + '('+defendRoll+')';
	}
	console.log(msg);
	messageBox = document.getElementById('message');
	messageBox.textContent = msg;
}

function getLandsForOwner(player) {
	var ownedLands = [];
	for (var i=0; i<lands.length; i++) {
		if (lands[i].owner.name == player.name) {
			ownedLands.push(lands[i]);
		}
	}
	return ownedLands;
}