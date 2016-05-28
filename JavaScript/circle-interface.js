
// Generic interface for both circleShape and circleManager objects
var CircleInterface = function () {
	'use strict';
	this.originX = 0;
	this.originY = 0;
	this.radiusPointX = 0;
	this.radiusPointY = 0;
};

/**
 * @function	initXY() puts the _radiusPointX &
 *			_radiusPointY at their initial location
 *
 * @param x          (1O'clock) coordinate of the X radius point to
 *			                  be used as the starting point from which, the
 *			                  radius is rotated to the specified angle
 *
 * @param y (12 O'clock) coordinate of the Y radius point to
 *			be used as the starting point from which, the
 *			radius is rotated to the specified angle
 *
 * @return {null}
 */
CircleInterface.prototype.initXY = function (x, y) { 'use strict'; };

/**
 * @function rotate() move the radiusPoint to a new location
 */
CircleInterface.prototype.rotate = function () { 'use strict'; };

/**
 * @function rotateXY() move the radiusPoint to a new location
 */
CircleInterface.prototype.rotateXY = function (x, y) { 'use strict'; };

/**
 * @function setOriginXY() sets the _originX & _originY for
 *			the circle object
 */
CircleInterface.prototype.setOriginXY = function (x, y) {
	'use strict';
	this.originX = x;
	this.originY = y;
};

/**
 * @function getX() returns the final _radiusPointX in the
 *			stack (the one that will be used as the origin of
 *			one drawing arm)
 */
CircleInterface.prototype.getX = function () {
	'use strict';
	return this.radiusPointX;
};

/**
 * @function getY() like getX() but for the Y value
 */
CircleInterface.prototype.getY = function () {
	'use strict';
	return this.radiusPointY;
};

/**
 * @function getOriginX() returns the _originX of this
 *			circleManager object
 */
CircleInterface.prototype.getOriginX = function () {
	'use strict';
	return this.originX;
};

/**
 * @function getOriginY() returns the _originY of this
 *			circleManager object
 */
CircleInterface.prototype.getOriginY = function () {
	'use strict';
	return this.originY;
};

