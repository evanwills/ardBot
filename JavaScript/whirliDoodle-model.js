var whirliDoodleModel = function (width, height, booms, firstCircle, secondCircle, tableRotator) {
	'use strict';
	this.width = 0;
	this.height = 0;
	this.booms = null;
	this.firstCircle = null;
	this.tableRotator = null;
	this.x = 0;
	this.y = 0;

	if (typeof width !== 'number' || width <= 0) {
		throw {'msg': 'WhirliDoodleModel expects first parameter "Width" to be a number greater than zero. ' + typeof width + ' given' };
	}
	if (typeof height !== 'number' || height <= 0) {
		throw {'msg': 'WhirliDoodleModel expects first parameter "height" to be a number greater than zero. ' + typeof height + ' given' };
	}
	if (typeof height !== 'number' || height <= 0) {
		throw {'msg': 'WhirliDoodleModel expects first parameter "height" to be a number greater than zero. ' + typeof height + ' given' };
	}
	this.width = width;
	this.height = height;
	this.booms = booms;

	firstCircle.fixDepth();
	this.firstCircle = firstCircle;

	secondCircle.fixDepth();
	this.secondCircle = secondCircle;
	this.tableRotator = tableRotator;
};


whirliDoodleModel.prototype.move = function() {
	this.firstCircle.rotate();
	this.secondCircle.rotate();
	this.booms.getEndPoint(this.firstCircle.getX(), this.firstCircle.getY(), this.secondCircle.getX(), this.secondCircle.getY());
	this.tableRotator.rotateXY(this.booms.getX(), this.booms.getY());
}

whirliDoodleModel.prototype.getX = function() {
	return this.tableRotator.getX();
}

whirliDoodleModel.prototype.getY = function() {
	return this.tableRotator.getY();
}