var GAME = GAME || {};
GAME.Entities = GAME.Entities || {};

GAME.Entities.Pool = (function () {
	'use strict';

	// [ Private Variables ]
	var pool = {
		obstacles : [],
		projectiles : [],
		wizards : [],
		visualeffects : []
	};

	var ml = {};

	// [ Public Methods ]
	ml.clear = function () {
		for (var key in pool) {
			pool[key] = [];
		}
	};

	ml.clean = function () {
		/* Remove all inactive entities from each pool. */
		for (var key in pool) {
			pool[key] = pool[key].filter(function (item) {
				return item.config.active;
			});
		}
	};

	ml.addEntity = function (key, entity) {
		/* Adds a new entity to specified pool. */
		pool[key].push(entity);
	};

	ml.get = function (key) {
		return pool[key];
	};

	ml.getPool = function () {
		return pool;
	};

	return ml;
}());