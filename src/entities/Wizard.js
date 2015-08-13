var GAME = GAME || {};
GAME.Entities = GAME.Entities || {};

var GAME.Entities.Wizard = function (specs) {
	this.config = {
		active    : true,
		angle     : specs.angle,
		moveSpeed : specs.moveSpeed,
		turnSpeed : specs.turnSpeed,
		health    : 1000,
		velocity  : {direction: 0, magnitude: 0},
		position  : {x: specs.x, y: specs.y}
	};
};

GAME.Entities.Wizard.prototype.move = function (x, y) {

};