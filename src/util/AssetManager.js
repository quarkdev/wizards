var GAME = GAME || {};

GAME.AssetManager = (function () {
	'use strict';

	// [ Private Variables ]
	var assets = {
		queue: [],
		queued: 0,
		loaded: 0,
		failed: 0
	};

	var library = {};

	var ml = {};

	// [ Public Methods ]
	ml.queue = function (type, id, url) {
		assets.queue.push({type: type, id: id, url: url});
		assets.queued += 1;
	};

	ml.load = function (onSuccess, onError) {
		var item = assets.queue.shift();

		if (!library.hasOwnProperty(item.type)) { library[item.type] = {}; }

		if (item.id in library[item.type]) {
			assets.failed += 1;
			onError(item, 'An instance of the asset already exists in library.');
			return;
		}

		switch (item.type) {
			case 'image':
				var image = new Image();
				image.id = item.id;

				image.onload = function () {
					assets.loaded += 1;
					onSuccess(item);
				};

				image.onerror = function () {
					assets.failed += 1;
					onError(item);
				};

				image.src = item.url;

				library[item.type][item.id] = image;
				break;
			case 'sound':
				break;
			case 'soundpool':
				break;
			case 'blueprint':
				break;
			default:
				break;
		}
	};

	ml.loadAll = function (onEachSuccess, onEachError, onComplete) {
		while (assets.queue.length > 0) {
			ml.load(function (item) {
				onEachSuccess(item, assets.loaded/assets.queued);

				if (assets.loaded === assets.queued) {
					ml.clear();
					onComplete();
				}
			}, function (item) {
				onEachError(item);
			});
		}
	};

	ml.clear = function () {
		assets.queued = 0;
		assets.loaded = 0;
		assets.failed = 0;
	};

	ml.get = function (type, id) {
		return library[type][id];
	};

	ml.getByType = function (type) {
		return library[type];
	};

	return ml;
}());