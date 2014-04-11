(function () {
	
	// The Grid component allows an element to be located
	//  on a grid of tiles
	Crafty.c('Grid', {
		init: function () {
		},

		onMap: function (map){
			this.attr({
				w: map.blockWidth,
				h: map.blockHeight,
			});
			return this;
		},

		// Locate this entity at the given position on the grid
		at: function(x, y) {
			if (x === undefined && y === undefined) 
			{
				return { x: this.x/this.w, y: this.y/this.h };
			} 
			else 
			{
				this.attr({ x: x * this.w, y: y * this.h });
	  			return this;
	  		}
	  	}
	});

	// An "Actor" is an entity that is drawn in 2D on canvas
	//  via our logical coordinate grid
	Crafty.c('Actor', {
		init: function () {
			this.requires('2D, Canvas, Grid, Color');
		}
	});

	Crafty.c('Tree', {
		init: function () {
			this.requires('Actor');
			this.color('rgb(67, 164, 11)');
		}
	});

	Crafty.c('Fence', {
		init: function () {
			this.requires('Actor');
			this.color('rgb(198, 125, 42)');
		}
	});

	Crafty.c('Bird', {
		init: function () {
			this.requires('Actor');
			this.color('black');
		}
	});

	Crafty.c('PlayerCharacter', {
		init: function () {
			this.requires('Actor');
			this.color('red');
		}
	})
}());