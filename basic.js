
    function clickOnLand(path) {
      if (player.name!=turn.name) {
        // solo respondemos a los clicks del jugador en su turno
        return;
      }
      var selectedLand = null;
      if (selected!=null) {
        selectedLand = getLandForPathId(selected.id);
      }
      var clickedLand = getLandForPathId(path.id);
      var neighbours = getNeighbours(path);

      // path enemy not neighbour > do nothing
      if (clickedLand.owner.name!=player.name && clickedLand.state != 'neighbour') {
        // do nothing
      } else if (selectedLand == clickedLand) {
        // selected == path > unselect selected
        reset();
        selected = null;
      } else if (selectedLand != null && selectedLand.owner.name == player.name && selectedLand.current_dice > 1
                  && clickedLand.owner.name != player.name && clickedLand.state == 'neighbour') {
        // selected mine, path enemy, neighbour > attack
        attack(selectedLand, clickedLand);
      } else {
        // selected enemy || null, path whatever > select path
        // selected mine, path mine > select path
        reset();
        selected = path;
        applySelectedStyle(clickedLand);
        for (var i=0; i<neighbours.length; i++) {
          applyNeighbourStyle(neighbours[i]);
        }
      }
    }

    function reset() {
      for (var i=0; i<lands.length; i++) {
        applyUnselectedStyle(lands[i]);
      }      
    }

    function mouseOverLand(path) {
      var land = getLandForPathId(path.id);
      path.style.stroke = '#585858';
      path.style['stroke-width'] = 0.5;
    }

    function mouseOutLand(path) {
      var land = getLandForPathId(path.id);
      path.style.stroke = 'grey';
      path.style['stroke-width'] = 0.2;
    }

    function applySelectedStyle(land) {
      var path = document.getElementById(land.path_id);
      land.state = "selected";
      path.style.fill = land.owner.color.enabledColor;
      var label = document.getElementById(land.label_id);
      label.textContent = land.current_dice;
    }

    function applyUnselectedStyle(land) {
      land.state = "unselected";
      var path = document.getElementById(land.path_id);
      path.style.fill = land.owner.color.disabledColor;
      var label = document.getElementById(land.label_id);
      label.textContent = land.current_dice;
    }

    function applyNeighbourStyle(path) {
      var land = getLandForPathId(path.id);
      land.state = "neighbour";
      path.style.fill = land.owner.color.neighbourColor;
    }

    function applyAttackStyle(contender, roll) {
      path = document.getElementById(contender.path_id)
      path.style.fill = 'grey';
      var label = document.getElementById(contender.label_id);
      label.textContent = roll;
    }
