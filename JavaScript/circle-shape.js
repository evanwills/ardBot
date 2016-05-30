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

CircleShape.prototype.getRadiusPointX = function () {
	'use strict';
	return this.tmpX;
};

CircleShape.prototype.getRadiusPointY = function () {
	'use strict';
	return this.tmpX;
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
		throw {'msg', 'Circle() expects third parameter "radius" have a minimum greater than zero.' + radius.getMin() + ' given.'};
	}
	this.angleStep = angleStep;
	this.initialAngle = initalAngle;
	this.radius = radius;
};

Circle.prototype = Object.create(CircleShape);

Circle.prototype.rotateXY = function (x, y) {
	'use strict';
	var relativeX = x - this.orginX,
		relativeY = y - this.orginY;

	this.tmpAngle = this.angleStep.getStep();
	this.tmpX = (relativeX * Math.cos(this.tmpAngle)) - (relativeY * Math.sin(this.tmpAngle));
	this.tmpY = (relativeX * Math.sin(this.tmpAngle)) + (relativeY * Math.cos(this.tmpAngle));
};

Circle.prototype.rotate = function () {
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
