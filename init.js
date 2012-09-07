function Color(enabledColor, disabledColor, neighbourColor) {
	this.enabledColor = enabledColor;
	this.disabledColor = disabledColor;
	this.neighbourColor = neighbourColor;
}

function Player(name, displayName, color, avatar) {
	this.name = name;
	this.color = color;
	this.displayName = displayName;
	this.numLands = 0;
	this.avatar = avatar;
}

Player.prototype.isMachine = function() {
	return ((/^machine/).test(turn.name));
};

Player.prototype.isAlive = function() {
	for (var i=0; i<lands.length; i++) {
		if (lands[i].owner == this)
			return this;
	}
};

var red = new Color('#FF0000', '#F78181', '#FA5858');
var blue = new Color('#045FB4', '#81BEF7', '#2E9AFE');
var green = new Color('#04B431', '#81F79F', '#00FF40');

var human = new Player('human', 'tú', red, 'robots/monkey.jpg');
var machine1 = new Player('machine_1', 'skippy', blue, 'robots/skippy_web.jpg');
var machine2 = new Player('machine_2', 'mildred', green, 'robots/mildred_web.jpg');

function randomPlayer() {
	return players[Math.floor(Math.random()*players.length)];
}

function Land(path_id, label_id, current_dice, max_dice, owner) {
	this.path_id = path_id;
	this.label_id = label_id;
	this.current_dice = current_dice;
	this.max_dice = max_dice;
	this.owner = owner;
	// on, off, neighbour
	this.state = 'off';
}

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

function updateMessageBox(msg) {
	var messageBox = document.getElementById('message');
	if (msg == null) {
		var msg = 'turno de '+turn.displayName;
		if (turn==player) {
			msg = 'tu turno!';
		}
	}
	messageBox.textContent = msg;
}

function init() {

	players = [
		human,
		machine1,
		machine2
	];
	fisherYates(players);
	for (var i=0; i<players.length; i++) {
		document.getElementById('avatar'+i).src = players[i].avatar;
		document.getElementById('playerName'+i).innerHTML = players[i].displayName;
		document.getElementById('hud'+i).style.borderColor = players[i].color.disabledColor;
	}


	lands = [
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

	selected = null;
	player = human;
	turn = players[0];

	newGameButton = document.getElementById('new-game');
	newGameButton.style.visibility = 'hidden';
	endTurnButton = document.getElementById('end-turn');
	endTurnButton.style.visibility = 'visible';
	if (turn.name!=player.name) {
		endTurnButton.disabled = true;
	} else {
		endTurnButton.disabled = false;
	}
	endTurnButton.onclick = function() {
		endTurn();
	}
	newGameButton.onclick = function() {
		init();
	}

	updateMessageBox();
	updateHud();

	for (var i=0; i<lands.length; i++) {
		land = document.getElementById(lands[i].path_id);
		label = document.getElementById(lands[i].label_id);
		land.onclick = function(event) {
			clickOnLand(event.target);
		}
		land.onmouseover = function(event) {
			mouseOverLand(event.target);
		}
		land.onmouseout = function(event) {
			mouseOutLand(event.target);
		}
		label.onclick = function(event) {
			clickOnLand(getPathForLabel(event.target.id));
		}
		label.onmouseover = function(event) {
			mouseOverLand(getPathForLabel(event.target.id));
		}
		label.onmouseout = function(event) {
			mouseOutLand(getPathForLabel(event.target.id));
		}
	}

	reset();
	if (turn.isMachine()) {
		console.log('machine at work');
		machineTurn();
	}
}

init();