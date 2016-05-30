var CircleShape = function () {
	'use strict';
	this.angleStep = 0;
	this.currentAngle = 0;
	this.initialAngle = 0;
	this.tmpAngle = 0;
	this.tmpX = 0;
	this.tmpY = 0;
};

CircleShape.prototype = Object.create(CircleInterface);

CircleShape.prototype.setRadiusPointXY = function (x, y) {
	'use strict';
};


/**
 * Gives the most recently calculated X coordinate.
 * @returns {number} the Y coordinate for the most recently calculated move
 */
CircleShape.prototype.getRadiusPointX = function () {
	'use strict';
	return this.tmpX;
};

/**
 * Gives the most recently calculated Y coordinate.
 * @returns {number} the Y coordinate for the most recently calculated move
 */
CircleShape.prototype.getRadiusPointY = function () {
	'use strict';
	return this.tmpY;
};


/**
 * Convert degrees into radians
 * @param   {number} degrees angle in degrees
 * @returns {number} angle in radians
 */
CircleShape.prototype.deg2rad = function (degrees) {
	'use strict';
	return ((degrees * Math.PI) / 180);
};





//  END:  CircleShape (interface)
// ========================================================================
// START: Circle object







var Circle = function (initialAngle, angleStep, radius) {
	'use strict';
	if (typeof initialAngle !== 'number') {
		throw {'msg': 'Circle() expects first parameter "initialAngle" to be a number.' + typeof angleStep + ' given.'};
	}
	if (initialAngle <= -360 || initialAngle >= 360) {
		throw {'msg': 'Circle() expects first parameter "initialAngle" to be a number greater than -360 and less than 360.' + angleStep + ' given.'};
	}
	if (typeof angleStep !== 'IncrementManager') {
		throw {'msg': 'Circle() expects second parameter "angleStep" to be an IncrementManager object.' + typeof angleStep + ' given.'};
	}
	if (typeof radius !== 'IncrementManager') {
		throw {'msg': 'Circle() expects third parameter "radius" to be an IncrementManager object.' + typeof radius + ' given.'};
	}
	if (radius.getMin() <= 0) {
		throw {'msg': 'Circle() expects third parameter "radius" have a minimum greater than zero.' + radius.getMin() + ' given.'};
	}
	this.angleStep = angleStep;
	this.initialAngle = this.deg2rad(initialAngle);
	this.radius = radius;
};

Circle.prototype = Object.create(CircleShape);

Circle.prototype.rotateXY = function (x, y) {
	'use strict';
	var angle = this.deg2rad(this.angleStep.getStep()),
		currentAngle = 0,
		radius = 0;

	// make X & Y relative to this circle's origin
	x += this.orginX;
	y += this.orginY;

	// --------------------------------------------------------------
	//	rotate XY around a circle without needing radius
	//	(https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions)

//	x = (x * Math.cos(this.tmpAngle)) - (y * Math.sin(this.tmpAngle));
//	y = (x * Math.sin(this.tmpAngle)) + (y * Math.cos(this.tmpAngle));
	// --------------------------------------------------------------


	// --------------------------------------------------------------
	// rotate XY using basic trigonometry
	if (angle !== 0) {
		radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if (x === 0 && y === 0) {
			return [x, y];
		} else if (x === 0) {
			currentAngle = Math.atan(y);
		} else if (y === 0) {
			currentAngle = Math.atan(x);
		} else {
			currentAngle = Math.atan(y / x);
		}
		currentAngle += angle;

		x = Math.cos(currentAngle) * radius;
		y = Math.sin(currentAngle) * radius;
	}
	// --------------------------------------------------------------

	// convert relative X & Y back to absolute X & Y
	x -= this.originX;
	y -= this.originY;

	this.tmpX = x;
	this.tmpY = y;
	this.tmpAngle = angle;

	return [x, y];
};

Circle.prototype.move = function () {
	'use strict';
	this.angleStep.updateStep();
	this.radius.updateStep();

	this.rotateXY(this.radiusPointX, this.radiusPointY);

	this.radiusPointX = this.tmpX;
	this.radiusPointY = this.tmpY;
	this.currentAngle = this.tmpAngletmpAngle;
};

Circle.prototype.initXY = function (originX, originY) {
	'use strict';
	this.setOriginXY(originX, originY);
};






//  END: Circle
// ========================================================================
// START: Ellipse object
// DO NOT USE!!!

var Ellipse = function (initialAngle, angleStep, radiusX, radiusY, radiusOffsetX, radiusOffsetY) {
	'use strict';
	this.initialAngle = initialAngle;
	this.angleStep = angleStep;
	this.radiusX = radiusX;
	this.radiusY = radiusY;
	this.radiusoffsetX = radiusOffsetX;
	this.radiusoffsetY = radiusOffsetY;
};

Ellipse.prototype = Object.create(CircleShape);






//  END: Ellipse
// ========================================================================
