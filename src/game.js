var Game = (function () {
	var map = MAP.createMap(32, 32);

	var populatePlayer = function (map) {
		var coords = map.getPlayerStartCoords();
		var camera = Crafty.e('Camera, WiredHitBox').onMap(map).at(coords.x, coords.y).debugStroke("white");
		Crafty.e('PlayerCharacter').onMap(map).at(coords.x, coords.y).attach(camera);
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
							Crafty.e('Bird, WiredHitBox').onMap(map).at(i, j).debugStroke("white");
						}
						else if (rand < 0.2) {
							console.log("tree");
							Crafty.e('Tree, WiredHitBox').onMap(map).at(i, j).debugStroke("white");
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
		populatePlayer(map);
		populatePhotographable(map);		
	};

	return {
		start: start,
		currentPhotographValue: 0,
		totalScore: 0
	};
}());