function Land(path_id, label_id, current_dice, max_dice, owner) {
	this.path_id = path_id;
	this.label_id = label_id;
	this.current_dice = current_dice;
	this.max_dice = max_dice;
}

var lands = [
	new Land("andalucia_path", "andalucia_label", 1, 8, 'jorge'),
	new Land("canarias_path", "canarias_label", 1, 8, 'jorge'),
	new Land("baleares_path", "baleares_label", 1, 8, 'jorge'),
	new Land("murcia_path", "murcia_label", 1, 8, 'jorge'),
	new Land("extremadura_path", "extremadura_label", 1, 8, 'jorge'),
	new Land("castilla_la_mancha_path", "castilla_la_mancha_label", 1, 8, 'jorge'),
	new Land("valencia_path", "valencia_label", 1, 8, 'jorge'),
	new Land("baleares_path", "baleares_label", 1, 8, 'jorge'),
	new Land("madrid_path", "madrid_label", 1, 8, 'jorge'),
	new Land("catalunya_path", "catalunya_label", 1, 8, 'jorge'),
	new Land("aragon_path", "aragon_label", 1, 8, 'jorge'),
	new Land("castilla_y_leon_path", "castilla_y_leon_label", 1, 8, 'jorge'),
	new Land("galicia_path", "galicia_label", 1, 8, 'jorge'),
	new Land("navarra_path", "navarra_label", 1, 8, 'jorge'),
	new Land("la_rioja_path", "la_rioja_label", 1, 8, 'jorge'),
	new Land("pais_vasco_path", "pais_vasco_label", 1, 8, 'jorge'),
	new Land("cantabria_path", "cantabria_label", 1, 8, 'jorge'),
	new Land("asturias_path", "asturias_label", 1, 8, 'jorge'),
	new Land("ceuta_path", "ceuta_label", 1, 8, 'jorge'),
	new Land("melilla_path", "melilla_label", 1, 8, 'jorge')
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
