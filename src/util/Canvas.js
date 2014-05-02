var GAME = GAME || {};

GAME.Canvas = (function () {
	var ml = {};

	// [ Public Methods ]

	ml.setup = function (canvas, ctx) {
		// Convert from screen coordinates to cartesian.
		ctx.translate(0, canvas.height);
		ctx.scale(1, -1);
		ctx.save();
	};

	ml.clear = function (canvas, ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	my.drawEntities = function (ctx) {
		var entities = GAME.Entities.Pool.getPool();

		for (var key in entities) {
			for (var i = 0, len = entities[key].length; i < len; i++) {
				entities[key][i].draw(ctx);
			}
		}
	};

	return ml;
}());