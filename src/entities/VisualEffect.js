var GAME = GAME || {};
GAME.Entities = GAME.Entities || {};

GAME.Entities.VisualEffect = function (specs) {
    this.config = {
        active  : true,
        x       : specs.x,
        x       : specs.y,
        width   : specs.width,
        height  : specs.height,
        angle   : specs.angle || 0,
        scaleW  : specs.scaleW,
        scaleH  : specs.scaleH,
        frames  : specs.frames,
        index   : 0,
        fps     : specs.fps || 30,
        loop    : specs.loop || false,
        frozen  : specs.frozen || false,
        sheet   : GAME.AssetManager.get('image', specs.sheet);
    };
};

GAME.Entities.VisualEffect.prototype.update = function (delta) {
	var vx = this.config;

	if (!vx.active || vx.frozen) return;

	var framesJumped = vx.fps * delta;

	// Check if frame update went beyond the allowed frames.
	if (vx.index + framesJumped > vx.frames) {
		// if looping is allowed, go back to the index 0
		if (vx.loop) {
			vx.index = 0;
		}
		else {
			// if looping is false, kill the vfx
			vx.active = false;
			return;
		}
	}
	else {
		vx.index += framesJumped;
	}
};

GAME.Entities.VisualEffect.prototype.draw = function (ctx) {
	var vx = this.config;

	if (!vx.active) return;

	var angleInRadians = vx.angle * Math.PI/180;

	ctx.translate(vx.x, vx.y);
	ctx.rotate(angleInRadians);
	ctx.drawImage(
		vx.sheet,
		vx.index * vx.width,
		vx.height,
		vx.width,
		vx.height,
		-vx.scaleW/2,
		-vx.scaleH/2,
		vx.scaleW,
		vx.scaleH
	);
	ctx.rotate(-angleInRadians);
	ctx.translate(-vx.x, -vx.y);
};