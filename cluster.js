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

/*function getLandsForOwner(player) {
	var ownedLands = [];
	for (var i=0; i<lands.length; i++) {
		if (lands[i].owner.name == player) {
			ownedLands.push(lands[i]);
		}
	}
	return ownedLands;
}*/

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
