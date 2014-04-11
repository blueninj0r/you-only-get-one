var Game = (function () {
	var map = MAP.createMap(64, 64);

	var populatePlayer = function (map) {
		var coords = map.getPlayerStartCoords();
		Crafty.e('PlayerCharacter').onMap(map).at(coords.x, coords.y);
	};

	var populatePhotographable = function (map) {
		var i, j;
		for (i = 0; i < map.gridWidth; i++){
			for (j = 0; j < map.gridHeight; j++){
				if (!map.isPlayerStartCoords(i, j)){
					if (map.isEdgeCoord(i, j)){
						Crafty.e('Fence').onMap(map).at(i, j);
					}
					else {
						var rand = Math.random();
						if (rand < 0.02) {
							Crafty.e('Bird').onMap(map).at(i, j);
						}
						else if (rand < 0.2) {
							console.log("tree");
							Crafty.e('Tree').onMap(map).at(i, j);
						}
					}}
				}
			}
		};

	// This function initialises the game - it should remain simple
	var start = function () {
		console.log("Starting!!!");		
		Crafty.init(map.width(), map.height());
		Crafty.background('green');
		populatePhotographable(map);
		populatePlayer(map);
	};

	return {
		start: start
	};
}());