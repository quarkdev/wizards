var GAME = GAME || {};

GAME.Main = (function () {
	'use strict';

	// [ Private Variables ]
	var ml = {};

	// [ Public Methods ]

	ml.init = function () {
		// Add a progress bar before the game div
		var pgw  = $('#progress-wrapper');
		var pg   = $('#progress');
		var pgt  = $('#progress-title');
		var pgst = $('#progress-subtitle');

		pgt.html('Loading Assets...');

		// Queue all required assets
		GAME.AssetManager.queue('image', 'explosion', './assets/images/spritesheets/explosion.png');
		GAME.AssetManager.queue('image', 'volumetric_explosion', './assets/images/spritesheets/volumetric_explosion.png');
		GAME.AssetManager.queue('image', 'volumetric_explosion2', './assets/images/spritesheets/volumetric_explosion2.png');

		// Load all queued assets
		GAME.AssetManager.loadAll(function (item, completed) {
			pgst.html(item.id + ' loaded.');
			progress.value = 100 * completed;
		}, function (item) {
			pgst.html('Error: Failed to load: ' + item.id);
		}, function () {
			pgt.html('Assets loaded successfully!')
			pgst.html('');
			pgw.delay(700).fadeOut();
		});
	};

	return ml;
}());