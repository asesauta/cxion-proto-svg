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

var players = [
	new Player('human', red),
	new Player('machine', blue),
];