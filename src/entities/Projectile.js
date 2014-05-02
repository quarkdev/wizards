var GAME = GAME || {};
GAME.Entities = GAME.Entities || {};

GAME.Entities.Projectile = function (specs) {
	this.config = {
		active   : true,
		particle : specs.particle || 'fireball',
		radius   : specs.radius || 3,
		speed    : specs.speed || 100,
		damage   : specs.damage || 10,
		force    : specs.force || 10,
		range    : specs.range || 250,
		angle    : specs.angle,
		origin   : {x: specs.x, y: specs.y},
		position : {x: specs.x, y: specs.y},
		source   : specs.source
	};
};

GAME.Entities.Projectile.prototype.update = function (delta) {
	var geo = GAME.Util.Geometry;
	var p = this.config;
	var angleInRadians = p.angle * Math.PI/180;

	// Save last position.
	var lastPos = {
		x : p.position.x,
		y : p.position.y
	}

	// Update projectile position.
	p.position.x = p.position.x + (p.speed * delta * Math.cos(angleInRadians));
	p.position.y = p.position.y + (p.speed * delta * Math.sin(angleInRadians));

	// Check if projectile has reached its maximum range.
	var distanceTravelled = geo.getDistanceBetweenTwoPoints(origin, position);
	
	if (distanceTravelled > p.range) {
		// Maximum range reached. Projectile has impacted the ground.
		this.impact();
		return;
	}

	// Check if projectile impacted with a wizard.
	var wizards = GAME.Entities.Pool.get('wizards');
	var wiz = {};
	for (var i = 0, len = wizards.length; i < len; i++) {
		wiz = wizards[i].config;
		if (geo.circlesAreColliding({o: {x: wiz.position.x, y: wiz.position.y}, r: wiz.radius}, {o: {x: p.position.x, y: p.position.y}, r: p.radius})) {
			// Impact with a wizard.
			wizards[i].hit(this);
			this.impact();
			return;
		}
	}

	// Check if projectile impacted with an obstacle.
	var obstacles = GAME.Entities.Pool.get('obstacles');
	var obs = {};
	for (var i = 0, len = obstacles.length; i < len; i++) {
		obs = obstacles[i].config;
		if (geo.circlesAreColliding({o: {x: obs.position.x, y: obs.position.y}, r: obs.radius}, {o: {x: p.position.x, y: p.position.y}, r: p.radius})) {
			// Impact with a wizard.
			this.impact();
			return;
		}
	}
};

GAME.Entities.Projectile.prototype.impact = function () {
	// Spawn an impact vfx at impact position.
	GAME.Entities.Pool.addEntity('visualeffects', new GAME.Entities.VisualEffect({sheet: this.particle, x: p.position.x, y: p.position.y, size: 42}));
	p.active = false;
};

GAME.Entities.Projectile.prototype.draw = function () {
	// Spawn a head vfx at current position.
	if (!p.active) { return; }

	GAME.Entities.Pool.addEntity('visualeffects', new GAME.Entities.VisualEffect({sheet: this.particle, x: p.position.x, y: p.position.y, size: 32}));
};