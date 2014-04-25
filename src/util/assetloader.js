var GAME = GAME || {};

GAME.AssetLoader = (function () {
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

		switch (item.type) {
			case 'image':
				if (!library.hasOwnProperty('images')) { library['images'] = {}; }

				if (item.id in library.images) {
					assets.failed += 1;
					onError(item, 'An instance of the asset already exists in library.');
					return;
				}

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

				library.images[id] = image;
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
		while (asset.queue.length > 0) {
			ml.load(function (item) {
				onEachSuccess(item);

				if (assets.loaded === assets.queue) {
					ml.clear();
					onComplete();
				}
			}, onEachError);
		}
	};

	ml.clear = function () {
		assets.queued = 0;
		assets.loaded = 0;
		assets.failed = 0;
	};

	return ml;
}());