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

		void rotate() {
			double _firstX = 0;
			double _firstY = 0;
			double _secondX = 0;
			double _secondY = 0;

			_firstCircle.rotate();
			_secondCircle.rotate();
			_booms.setEndPoint( _firstCircle.getX() , _firstCircle.getY() , _secondCircle.getX() , _secondCircle.getY() );
			_tableRotator.rotate( _booms.getX() , _booms.getY() );

			_x = _tableRotator.getX();
			_y = _tableRotator.getY();
		}

		double getX() {
			return _x;
		}

		double getY() {
			return _y;
		}

}