
function Boom() {
	'use strict';
	this.firstBoom = null;
	this.secondBoom = null;
	this.endX = 0;
	this.endY = 0;
}

Boom.prototype = new Object();
Boom.prototype.constructor = Boom;

Boom.prototype.getEndPoint = function (firstOriginX, firstOriginY, secondOriginX, secondOriginY) {
	'use strict';
};


Boom.prototype.getX = function () {
	'use strict';
	return this.endX;
};

Boom.prototype.getY = function () {
	'use strict';
	return this.endY;
};

Boom.prototype._getPosName = function (input) {
	'use strict';
	switch (input) {
	case 1:
		return 'first';

	case 2:
		return 'second';

	case 3:
		return 'third';

	case 4:
		return 'fourth';

	case 5:
		return 'fifth';

	case 6:
		return 'sixth';

	case 7:
		return 'seventh';

	}
};

Boom.prototype._validateBoomParam = function (boom, pos, paramName) {
	'use strict';
	var _pos = this._getPosName(pos);

	if (!boom instanceof IncrementManager) {
		throw {'message': this.constructor.name + '() expects ' + _pos + ' parameter "' + paramName + '" to be an instance of IncrementManager. ' + typeof boom + ' given'};
	}
	if (boom.isInfinite() === true) {
		throw {'message': this.constructor.name + '() ' + _pos + ' parameter "' + paramName + '" must not be in infinite mode.'};
	} else if (boom.getMin() < 0) {
		throw {'message': this.constructor.name + '() ' + _pos + ' parameter "' + paramName + '" must have a minimum of zero or greater. Minimum is: ' + boom.getMin()};
	}
	return boom;
};


Boom.prototype._validateOffsetParam = function (offset, pos, paramName) {
	'use strict';
	var _pos = this._getPosName(pos);

	if (!offset instanceof IncrementManager) {
		throw {'message': this.constructor.name + '() expects ' + _pos + ' parameter "' + paramName + '" to be an instance of IncrementManager. ' + typeof offset + ' given'};
	}
	if (offset.isInfinite() === true) {
		throw {'message': this.constructor.name + '() ' + _pos + ' parameter "' + paramName + '" must not be in infinite mode.'};
	} else if (offset.withinMinMax(0, 1) === true) {
		throw {'message': this.constructor.name + '() ' + _pos + ' parameter "' + paramName + '" must be between zero and one. Minimum is: ' + offset.getMin() + ' Maximum is ' + offset.getMax()};
	}
	return offset;
};







//  END:  Boom (interface)
// ==================================================================
// START: Vboom (straight boom)







/**
 * @class	straightBoom the output of the circle managers provide
 *			the base points for each arm  setEndPoint() gives the
 *			third point on the triangle
 */
/**
 * @function Vboom()
 *
 * @param firstBoom  provides   the offset and length for the
 *		                            first boom
 * @param secondBoom provides   the offset and length for the
 *		                            second boom
 * @param hingeOffset provides  the point along the long boom that
 *		                        the small boom connects and pivots
 */
function Vboom(firstBoom, secondBoom) {
	'use strict';
	var tmp = this._validateBoomParam(firstBoom, secondBoom);

	this.firstBoom = this._validateBoomParam(firstBoom, 1, 'firstBoom');
	if (secondBoom === undefined) {
		secondBoom = firstBoom;
	} else {
		this.secondBoom = this._validateBoomParam(secondBoom, 2, 'secondBoom');
	}
}
Vboom.prototype = new Boom();
Vboom.prototype.constructor = Vboom;

Vboom.prototype.setEndPoint = function (firstOriginX, firstOriginY, secondOriginX, secondOriginY) {
	'use strict';
	// do the actual calculations
};






//  END:  Vboom (straight boom)
// ==================================================================
// START: TBoom






function TBoom(boom, offset) {
	'use strict';

	this.firstBoom = this._validateBoomParam(boom, 1, 'boom');
	this.offset = this._validateOffsetParam(offset, 2, 'offset');
}
TBoom.prototype = new Boom();
TBoom.prototype.constructor = TBoom;

TBoom.prototype.setEndPoint = function (firstOriginX, firstOriginY, secondOriginX, secondOriginY) {
	'use strict';
	// do the actual calculations
};






//  END:  TBoom
// ==================================================================
// START: YBoom






function YBoom(firstBoom, secondBoom, offset) {
	'use strict';
	var firstLong = true;

	this.firstBoom = this._validateBoomParam(firstBoom, 1, 'firstBoom');
	this.secondBoom = this._validateBoomParam(secondBoom, 2, 'secondBoom');
	this.offset = this._validateOffsetParam(offset, 3, 'offset');

	// long boom must always be longer than short boom
	// long boom min > short boom max
	// oneMin = 10			oneMin = 10
	// oneMax = 20			oneMax = 20
	// twoMin = 30			twoMin = 15
	// twoMax = 40			twoMax = 30
	if (firstBoom.getMax() < secondBoom.getMin()) {
		firstLong = false;
	} else if (
		(firstBoom.getMax() > secondBoom.getMin() && firstBoom.getMax() < secondBoom.getMax()) ||
		(secondBoom.getMax() > firstBoom.getMin() && secondBoom.getMax() < firstBoom.getMax())
	) {
		throw {'message': 'YBoom expects one boom to be longer than the other. It is possible that the long boom will be shorter than the short boom at some point.'};
	}
}

YBoom.prototype = new Boom();
YBoom.prototype.constructor = YBoom;

YBoom.prototype.setEndPoint = function (firstOriginX, firstOriginY, secondOriginX, secondOriginY) {
	'use strict';
	// do the actual calculations
};






//  END:  yBoom
// ==================================================================
// START: xboom






/**
 * @class xboom or scissor boom (sheped like so: ><>)
 *
 * This type of boom accentuates or amplifies the relationship
 * between the rotating discs when the bases of the scissor are close
 * together, the boom is elongaged, when they are far apart, the boom
 * is truncated. The movement of the "Pen" is much more dynamic than
 * with any of the other boom types.
 *
 * @param {incrementManager} firstBoom object that manages the length
 *                           of the first boom
 * @param {incrementManager|undefined} firstOffset object that
 *                           manages where along the first boom the
 *                           pivot is situated.
 *                           NOTE: If undefined, it defaults to 0.5
 * @param {incrementManager|undefined} secondBoom object that manages
 *                           the length of the second boom
 *                           NOTE: if undefined, firstBoom is used
 * @param {incrementManager|undefined} secondOffset object that
 *                           manages where along the second boom the
 *                           pivot is situated.
 *                           NOTE: If undefined, firstOffest is used
 * @param {incrementManager|undefined} firstReturnBoom object that
 *                           manages the length of the first return
 *                           boom
 *                           NOTE: if undefined, it's length is
 *                                 calculated dynamically each time
 *                                 it is used
 * @param {incrementManager|undefined} secondReturnBoom object that
 *                           manages the length of the second return
 *                           boom
 *                           NOTE: if undefined, it's length is
 *                                 calculated dynamically each time
 *                                 it is used
 * NOTE ALSO: if you are defining return booms manually and not
 *            thinking carefully about the values used in return
 *            booms, it's possible to these objects to return values
 *            that cannot form trinagles.
 */
function Xboom(firstBoom, firstOffset, secondBoom, secondOffset, firstReturnBoom, secondReturnBoom) {
	'use strict';

	this.boom1 = this._validateBoomParam(firstBoom, 1, 'firstBoom');
	this.offset1 = null;
	this.boom2 = null;
	this.offset2 = null;
	this.returnBoom1 = null;
	this.returnBoom2 = null;

	if (firstOffset === undefined) {
		this.offset1 = new IncrementFixed(0.5);
		this.boom2 = firstBoom;
		this.offset2 = this.offset1;
	} else {
		this.offset1 = this._validateOffsetParam(firstOffset, 2, 'firstOffset');
		if (secondBoom === undefined) {
			this.boom2 = firstBoom;
			this.offset2 = this.offset1;
		} else {
			this.boom2 = this._validateBoomParam(secondBoom, 3, 'secondBoom');
			if (secondOffset === undefined) {
				this.offset2 = this.offset1;
			} else {
				this.offset2 = this._validateOffsetParam(secondOffset, 4, 'secondOffset');
			}
		}
	}

	if (firstReturnBoom === undefined) {
		this._calc1stRetBoom = function () {
			return this.boom1.getStep() - (this.boom1.getStep() * this.offset1.getStep());
		};
	} else {
		this.returnBoom1 = this._validateBoomParam(firstReturnBoom, 5, 'firstReturnBoom');
	}

	if (secondReturnBoom === undefined) {
		this._calc2ndRetBoom = function () {
			return this.boom2.getStep() - (this.boom2.getStep() * this.offset2.getStep());
		};
	} else {
		this.returnBoom2 = this._validateBoomParam(secondReturnBoom, 6, 'secondReturnBoom');
	}
}

Xboom.prototype = new Boom();
Xboom.prototype.constructor = Xboom;

Xboom.prototype._calc1stRetBoom = function () {
	'use strict';
	return this.firstReturnBoom.getStep();
};

Xboom.prototype._calc2ndRetBoom = function () {
	'use strict';
	return this.secondReturnBoom.getStep();
};

Xboom.prototype.setEndPoint = function (firstOriginX, firstOriginY, secondOriginX, secondOriginY) {
	'use strict';
	var first = {
			'len': this.firstBoom.getStep,
			'off': this.firstOffset.getStep(),
			'return': this._calc1stRetBoom()
		},
		second = {
			'len': this.secondBoom.getStep,
			'off': this.secondOffset.getStep(),
			'return': this._calc1stRetBoom()
		};
	// do the actual calculations
};






//  END:  xboom
// ==================================================================
