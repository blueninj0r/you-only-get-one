var MAP = (function () {
	var gridWidth;
	var gridHeight;
	var blockHeight;
	var blockWidth; 

	var width = function () {
		return gridWidth * blockWidth;
	};

	var height = function () {
		return gridHeight * blockHeight;
	};

	var isEdgeCoord = function (x, y) {
		return x === 0 || y === 0 || x === (gridWidth - 1) || y === (gridHeight - 1);
	};	

	var isPlayerStartCoords = function (x, y) {
		return (x === gridWidth/2) && (y == gridHeight/2);
	};

	var isInStartArea = function (x, y){
		
	}

	var getPlayerStartCoords = function () {
		return { x: (gridWidth/2), y: (gridHeight/2)};
	};

	var createMap = function (w, h) {
		blockHeight = 20;
		blockWidth = 20;
		gridWidth = w;
		gridHeight = h;

		return {
			width: width,
			height: height,
			isEdgeCoord: isEdgeCoord,
			blockWidth: blockWidth,
			blockHeight: blockHeight,
			gridWidth: gridWidth,
			gridHeight: gridHeight,
			isPlayerStartCoords: isPlayerStartCoords,
			getPlayerStartCoords: getPlayerStartCoords
		};
	};

	return {
		createMap : createMap
	};
}());
