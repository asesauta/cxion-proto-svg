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

var machineMovements = [];
function attack(attacker, defender) {
	var attackRoll = diceRoll(attacker.current_dice);
	var defendRoll = diceRoll(defender.current_dice);

	if (turn.name=='human') {
		attackOutcome(attacker, attackRoll, defender, defendRoll);
		applyAttackStyle(attacker, attackRoll);
		setTimeout(applyAttackStyle, 300, defender, defendRoll);
		setTimeout(applyUnselectedStyle, 600, attacker);
		setTimeout(applyUnselectedStyle, 900, defender);
		if (isGameOver()) {
			setTimeout(applyWinnerStyle, 900, human);
			return;
		}	
	} else {
		attackOutcome(attacker, attackRoll, defender, defendRoll);
		machineMovements.push({'attacker': attacker, 'attackRoll': attackRoll, 'defender': defender, 'defendRoll': defendRoll});
	}
}

function attackOutcome(attacker, attackRoll, defender, defendRoll) {
	if (attackRoll>defendRoll) {
		msg = 'gana ' + attacker.path_id + '('+attackRoll+')'+' '+defender.path_id + '('+defendRoll+')';
		defender.current_dice = attacker.current_dice-1;
		defender.owner = attacker.owner;
		attacker.current_dice = 1;
		attacker.owner.numLands += 1;
		defender.owner.numLands -= 1;
	} else if (attackRoll<defendRoll) {
		msg = 'gana ' + defender.path_id + '('+defendRoll+')'+' '+attacker.path_id + '('+attackRoll+')';
		attacker.current_dice = 1;
	} else {
		msg = 'empate!!! ' + attacker.path_id + '('+attackRoll+')'+' '+defender.path_id + '('+defendRoll+')';
	}
	console.log(msg);
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

function areNeighbours(land1, land2) {
	for(var i=0; i<edges.length; i++) {
	    if (   (land1.path_id == edges[i][0] && land2.path_id == edges[i][1]) 
	    	|| (land1.path_id == edges[i][1] && land2.path_id == edges[i][0])   )
	    {
			//console.log('neighbours? yes: '+land1.path_id+' '+land2.path_id)
	    	return true;
	    }
	}
	//console.log('neighbours? no '+land1.path_id+' '+land2.path_id)
	return false;
}

function buildCluster(cluster, owned, node) {
	// yo siempre estoy en mi cluster
	cluster.push(node);
	// eliminamos land de owned, para no comparar con sí misma
	for (var i=0; i<owned.length; i++) {
		if (owned[i].path_id == node.path_id) {
			owned.splice(i, 1);
			break;
		}
	}
	for (var i=0; i<owned.length; i++) {
		if (areNeighbours(owned[i], node)) {
			buildCluster(cluster, owned, owned[i]);
			i = -1; // como owned puede haber cambiado, i ya no es un índice válido, reiniciamos
		}
	}
	return cluster;
}

function getBiggestCluster(player) {
	var owned = getLandsForOwner(player);
	biggestCluster = 0;
	while(owned.length>0) {
		var cluster = []
		var land = owned[0];
		cluster = buildCluster(cluster, owned, land);
		if (cluster.length>biggestCluster) {
			biggestCluster = cluster.length;
		}
	}
	return biggestCluster;
}
