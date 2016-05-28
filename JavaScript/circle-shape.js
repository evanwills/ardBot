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







var Circle = function (initalAngle, angleStep, radius) {
	'use strict';
	if (typeof angleStep !== 'Stepper') {
		throw {'msg': 'Circle() expects second parameter "angleStep" to be a Stepper object.' + typeof angleStep + ' given.'};
	}
	if (typeof radius !== 'Stepper') {
		throw {'msg': 'Circle() expects third parameter "radius" to be a Stepper object.' + typeof radius + ' given.'};
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
