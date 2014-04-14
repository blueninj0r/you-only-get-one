var Game = (function () {
	var map = MAP.createMap(32, 32);

	var populatePlayer = function (map) {
		var coords = map.getPlayerStartCoords();
		var camera = Crafty.e('Camera, WiredHitBox').onMap(map).at(coords.x, coords.y).debugStroke("white");
		var player = Crafty.e('PlayerCharacter').onMap(map).at(coords.x, coords.y).attach(camera);

		player.bind('Moved', function() {Crafty.trigger('PlayerMoved');});

		camera.bind('PlayerMoved', function (e) {
			var hit = this.hit('Photographable');
			var currentScore = 0;
			if (hit) {
						hit.forEach(function (x) {console.log(x);});}
			console.log(currentScore);			
		});

		camera.bind('KeyDown', function (e) {
			if(e.key == Crafty.keys.SPACE){
				var hit = this.hit('Photographable');
			}
		});
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
							Crafty.e('Tree').onMap(map).at(i, j);
						}
					}}
				}
			}
		};

	// This function initialises the game - it should remain simple
	var start = function () {
		console.log("Starting!!!");		
		Crafty.init(map.width() + (4 * map.blockWidth), map.height());
		Crafty.background('green');
		populatePlayer(map);
		populatePhotographable(map);	

			//score display
		var score = Crafty.e("2D, DOM, Text")
			.text("Score: 0")
			.attr({x: map.width() + map.blockWidth, y: map.blockHeight, w: 200, h:50})
			.css({color: "black"});	
	};

	return {
		start: start,
		currentPhotographValue: 0,
		totalScore: 0
	};
}());