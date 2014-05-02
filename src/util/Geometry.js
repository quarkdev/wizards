var GAME = GAME || {};
GAME.Util = GAME.Util || {};

GAME.Util.Geometry = (function () {
	'use strict';

	// [ Private Variables ]
	var ml = {};

	// [ Public Methods ]
	ml.getDistanceBetweenTwoPoints = function (p1, p2) {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	};

	ml.circlesAreColliding = function (c1, c2) {
		/* Determine if two circles defined by their center point and radius are colliding. Circle objects are structured like {o: {x: _, y: _}, r: _} */
		var distanceBetweenCenters = ml.getDistanceBetweenTwoPoints(c1.o, c2.o);
		return c1.r + c2.r <= distanceBetweenCenters;
	};

	return ml;
}());