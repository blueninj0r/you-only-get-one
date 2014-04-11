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
 	
	Crafty.c('Camera', {
		init: function () { 
			this.requires('2D, Grid, Collision');			
			this.collision([-50,-50], [-50, 70], [70, 70], [70, -50]);
		}
	});

	Crafty.c('Photographable', {
		init: function () {
			this.requires('Collision');
			this._photoValue = 1;
			this._inPhoto = false;
			this.updateOnCollision();			
		},

		addToPhoto: function () {
			if (!this._inPhoto){			
				Game.currentPhotographValue += this._photoValue;
				this._inPhoto = true;
				console.log("hi");	
			}
		},

		updateOnCollision: function () {
			this.onHit('Camera', this.addToPhoto);
		},

		setPhotoValue: function (val) {
			this._photoValue = val;
		},

		getPhotoValue: function () {
			return this._photoValue;
		}
	});

	Crafty.c('Tree', {
		init: function () {
			this.requires('Actor, Solid, Photographable');
			this.color('rgb(67, 164, 11)');
			this.setPhotoValue(2);	
		}
	});

	Crafty.c('Fence', {
		init: function () {
			this.requires('Actor, Solid, Photographable');
			this.color('rgb(198, 125, 42)');
			this.setPhotoValue(0.1);
		}
	});

	Crafty.c('Bird', {
		init: function () {
			this.requires('Actor, Solid, Photographable');
			this.color('black');
			this.setPhotoValue(5);
		}
	});

	Crafty.c('PlayerCharacter', {
		init: function () {
			this.requires('Actor, Fourway, Collision');
			this.color('red');
			this.fourway(2);
			this.stopOnSolids();
		},
		stopOnSolids: function () {
			this.onHit('Solid', this.stopMovement);
		},
		stopMovement: function () {
			this._speed = 0;
			if (this._movement) { 
				this.x -= this._movement.x;
				this.y -= this._movement.y;
			}
		}
	});
}());