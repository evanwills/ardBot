// ==================================================================
// How it should work:
//		1.
//		2.	for each child,
//		2.a.	get radiusPointX & radiusPointY
//		2.b.	rotate radiusPointX & radiusPointY around current
//				orginX & orginY
//		2.c.	send new radiusPointX & radiusPointY back to child
//		3.	repeat steps 1 - 3 for each child

// ==================================================================
// START: circleManager family

// circleManager class objects manage recursively rotating the
// radiusPointX & Y of each circle in the stack relative to the
// origin of the current circle.

// Not sure how this needs to be coded but... the this.radiusPointX,
// this.circle.this.radiusPointX, this.childCircle.this.originX and
// this.childCircle.this.circle.this.originX should all share the same pointer.
// The same goes for the this.radiusPointY

function CircleManager() {
	'use strict';
	this.circle = null;
	this.depth = 0;
}

CircleManager.prototype = new CircleInterface();
CircleManager.prototype.constructor = CircleManager;
/**
 * @method	depthOK() is used to varify that the stack of
 *			circles is OK. By OK, I mean that the
 *					last circle is a singleCircle object and
 *					that no MultiCircle objects were added
 *					after it.
 *
 * This method should be called after all the circleManager
 * objects have been initialised.
 *
 * NOTE: Because of the way MultiCircle is setup, it should
 *		 be OK to use a stack even if the output of depthOK()
 *		 is FALSE.
 */
CircleManager.prototype.depthOK = function () {
	'use strict';
	return true;
};

CircleManager.prototype.fixDepth = function () {
	'use strict';
	return true;
};

/**
 * @method	setChildCircle() adds another circleManager
 *			object to the top of the stack
 */
CircleManager.prototype.setChildCircle = function (childCircle) {
	'use strict';
};

/**
 * @method	setRadiusPointXY() sets the radius point at a
 *			given depth after the XY points have been rotated
 *			by lower circleManager object
 *
 * @param [double]   x         the X coordinate of the radius point
 * @param [double]   y         the Y coordinate of the radius point
 * @param [unsigned  in]       depth how far from the top of the
 *			                          stack the radius point should be set
 */
CircleManager.prototype.setRadiusPointXY = function (x, y, depth) {
	'use strict';

};

/**
 * @method	getCircleShape() returns the circleShape object
 *			used at a given depth;
 */
CircleManager.prototype.getCircleShape = function (depth) {
	'use strict';
	return this;
};

/**
 * @method getDepth() returns the level in the stack that the
 *					circle is at
 *					e.g. if there are 5 circles in the stack
 *						 and this one was added fourth, it's
 *						 depth would be 1
 */
CircleManager.prototype.getDepth = function () {
	'use strict';
	return 0;
};

/**
 * @method	getRadiusPointX() returns the this.radiusPointX
 *			coordinate at a given depth
 */
CircleManager.prototype.getRadiusPointX = function (depth) {
	'use strict';
	return 0;
};

/**
 * @method	getRadiusPointY() like getRadiusPointX() but for
 *			the Y value
 */
CircleManager.prototype.getRadiusPointY = function (depth) {
	'use strict';
	return 0;
};







//  END:  CircleManager (interface)
// ==================================================================
// START: SingleCircle







function SingleCircle(circle) {
	'use strict';
	if (typeof circle !== 'CircleShape') {
		throw {'msg': 'SingleCircle expects only parameter to be a CircleShape object. ' + typeof circle + ' given'};
	}
	this.circle = circle;
}

SingleCircle.prototype =  new CircleManager();
SingleCircle.prototype = Object.create(CircleManager);

SingleCircle.prototype.setChildCircle = function (childCircle) {
	'use strict';
	// do nothing singleCirclePoint objects have no child
};

SingleCircle.prototype.setRadiusPointXY = function (x, y, depth) {
	'use strict';
	this.radiusPointX = x;
	this.radiusPointY = y;
};

SingleCircle.prototype.setOriginXY = function (x, y) {
	'use strict';
	this.OriginX = x;
	this.OriginY = y;
	this.circle.setOriginXY(x, y);
};

SingleCircle.prototype.initXY = function (x, y) {
	'use strict';
	this.setOriginXY(x, y);
	this.circle.initXY(x, y);
	this.radiusPointX = this.circle.getX();
	this.radiusPointY = this.circle.getY();
};

/**
 * @method	move() rotates its own radius points
 */
SingleCircle.prototype.move = function () {
	'use strict';
	this.circle.setOriginXY(this.originX, this.originY);
	this.circle.rotateXY(this.radiusPointX, this.radiusPointY);
	this.radiusPointX = this.circle.getX();
	this.radiusPointY = this.circle.getY();
};

SingleCircle.prototype.getAngleStep = function (depth) {
	'use strict';
	return this.circle.getAngleStep(depth);
};

SingleCircle.prototype.getRadiusPointX = function (depth) {
	'use strict';
	return this.radiusPointX;
};

SingleCircle.prototype.getRadiusPointY = function (depth) {
	'use strict';
	return this.radiusPointY;
};







//  END:  SingleCircle
// ==================================================================
// START: MultiCircle







function MultiCircle(circle) {
	'use strict';

	if (typeof circle !== 'CircleShape') {
		throw {'msg': 'SingleCircle expects only parameter to be a CircleShape object. ' + typeof circle + ' given'};
	}
	this.circle = circle;

	this.childCircle = null;
}


MultiCircle.prototype = new SingleCircle();
MultiCircle.prototype = Object.create(MultiCircle);

MultiCircle.prototype.setChildCircle = function (childCircle) {
	'use strict';

	if (!childCircle instanceof SingleCircle) {
		throw {'message': 'MultiCircle.setChildCircle() expects only parameter "childCircle" to be either a SingleCircle or MultiCircle object. ' + childCircle.prototype + ' given.'};
	}

	this.depth += 1;
	if (this.childCircle ===  null) {
		this.childCircle = childCircle;
		this.childCircle.initXY(this.radiusPointX, this.radiusPointY);
	} else {
		this.childCircle.setChildCircle(this.childCircle);
	}
};

/**
 * @method	move() rotates its own radius points as
 *			well as those of all its children. It also sets
 *			the this.originX & this.originY of its direct child
 *			manager
 */
MultiCircle.prototype.move = function () {
	'use strict';
	var tmpDepth = this.depth,
		radiusPointX = 0,
		radiusPointY = 0;

	this.circle.setOriginXY(this.originX, this.originY);

	for (tmpDepth; tmpDepth >= 0; tmpDepth -= 1) {

		radiusPointX = this.childCircle.getRadiusPointX(tmpDepth);
		radiusPointY = this.childCircle.getRadiusPointY(tmpDepth);

		this.circle.rotateXY(radiusPointX, radiusPointY);

		this.childCircle.setRadiusPointXY(this.circle.getX(), this.circle.getY(), tmpDepth);
	}

	this.circle.rotate();

	this.radiusPointX = this.circle.getX();
	this.radiusPointY = this.circle.getY();

	this.childCircle.setOriginXY(this.radiusPointX, this.radiusPointY);
	this.childCircle.rotate();
};


/**
 * @method depthOK() checks whether the hierarchy of nested
 *			circles is correct
 */
MultiCircle.prototype.depthOK = function () {
	'use strict';
	var output = false;
	if (this.childCircle === null) {
		if (this.depth === 0) {
			output = true;
		}
	} else if (this.childCircle.getDepth() + 1 === this.depth) {
		output = true;
	}
	// this looks OK lets see whether the child is OK
	return output;
};


/**
 * @method fixDepth() makes sure the hierarchy of nested
 *			circles is correct
 */
MultiCircle.prototype.fixDepth = function () {
	'use strict';
	if (this.childCircle === null) {
		this.depth = 0;
	} else {
		this.childCircle.fixDepth();
		this.depth = this.childCircle.getDepth() + 1;
	}
};

MultiCircle.prototype.setRadiusPointXY = function (x, y, depth) {
	'use strict';
	depth -= 1;
	if (depth === this.depth) {
		this.radiusPointX = x;
		this.radiusPointY = y;
		// the radius point of this circle is the origin of the child
		this.childCircle.setOriginXY(x, y);
	} else {
		this.childCircle.setRadiusPointXY(x, y, depth);
	}
};

MultiCircle.prototype.getAngleStep = function (depth) {
	'use strict';
	depth -= 1;
	if (depth === this.depth) {
		return this.circle.getAngleStep();
	} else {
		return this.childCircle.getAngleStep(depth);
	}
};


MultiCircle.prototype.getRadiusPointX = function (depth) {
	'use strict';
	depth -= 1;
	if (depth === this.depth || this.childCircle === null) {
		return this.radiusPointX;
	} else {
		return this.childCircle.getRadiusPointX(depth);
	}
};

MultiCircle.prototype.getRadiusPointY = function (depth) {
	'use strict';
	depth -= 1;
	if (depth === this.depth || this.childCircle === null) {
		return this.radiusPointY;
	} else {
		return this.childCircle.getRadiusPointY(depth);
	}
};


MultiCircle.prototype.getX = function () {
	'use strict';
	if (this.childCircle === null) {
		return this.radiusPointX;
	} else {
		return this.childCircle.getX();
	}
};

MultiCircle.prototype.getY = function () {
	'use strict';
	if (this.childCircle === null) {
		return this.radiusPointY;
	} else {
		return this.childCircle.getY();
	}
};







//  END: circleManager
// ==================================================================
