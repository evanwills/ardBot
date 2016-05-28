// Stepper fixed needs some rethinking I'm pretty sure the cumulative stuff is unnecessary


var Stepper = function () {
	'use strict';
	this.step = 0;
	this.min = 0;
	this.max = 0;
	this.lastStep = 0;
	this.increment = 0;
};


Stepper.prototype.updateStep = function () {
	'use strict';
};

Stepper.prototype.getStep = function () {
	'use strict';
	return this.step;
};

Stepper.prototype.getIncrement = function () {
	'use strict';
	return this.increment;
};

Stepper.prototype.getLastStep = function () {
	'use strict';
	return this.lastStep;
};

Stepper.prototype.getMin = function () {
	'use strict';
	return this.min;
};

Stepper.prototype.getMax = function () {
	'use strict';
	return this.max;
};

Stepper.prototype.withinMinMax = function (min, max) {
	'use strict';
	var tmp;

	if (typeof min !== 'Number') {
		throw {'msg': 'StepperFixed expects first parameter "min" to be a number. ' + typeof min + ' given!'};
	}

	if (typeof max !== 'Number') {
		throw {'msg': 'StepperFixed expects second parameter "max" to be a number. ' + typeof max + ' given!'};
	}

	if (min > max) {
		tmp = min;
		min = max;
		max = tmp;
	}

	if (this.step > max || this.step < min || this.min < min || this.max >= max || this.max <= min) {
		return false;
	}
	return true;
};






//  END:  Stepper (interface)
// ==================================================================
// START: StepperFixed






var StepperFixed = function (step) {
	'use strict';
	if (typeof step !== 'Number') {
		throw {'msg': 'StepperFixed expects first parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	this.step = step;
	this.lastStep = step;
	this.min = step;
	this.max = step;
};
StepperFixed.prototype = Object.create(Stepper);







//  END:  StepperFixed
// ==================================================================
// START: StepperFixed





/**
 * supplies an ever decreasing step
 * @param {number} step        the value that will be returned
 * @param {number} decayFactor [[Description]]
 */
var StepperDecay = function (step, decayFactor) {
	'use strict';
	if (typeof step !== 'Number') {
		throw {'msg': 'StepperDecay expects first parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	if (typeof decayFactor !== 'Number') {
		throw {'msg': 'StepperDecay expects second parameter "decayFactor" to be a number. ' + typeof decayFactor + ' given!'};
	}
	this.step = step;
	this.min = 0;
	this.max = step;
	this.decayFactor = decayFactor;
};
StepperFixed.prototype = Object.create(Stepper);


Stepper.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;
	this.step *= this.decayFactor;
};







//  END:  StepperFixed
// ==================================================================
// START: StepperOscillate






var StepperOscillate = function (step, increment, min, max) {
	'use strict';

	var tmp = 'doMinMax';

	this.doMinMax = this.doMinMaxLinier;

	if (typeof step !== 'Number') {
		throw {'msg': 'StepperDecay expects first parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	if (typeof increment !== 'Number') {
		throw {'msg': 'StepperDecay expects second parameter "increment" to be a number. ' + typeof increment + ' given!'};
	}
	if (typeof min !== 'Number') {
		throw {'msg': 'StepperDecay expects third parameter "min" to be a number. ' + typeof min + ' given!'};
	}
	if (typeof max !== 'Number') {
		throw {'msg': 'StepperDecay expects fourth parameter "max" to be a number. ' + typeof max + ' given!'};
	}

	if (min > max) {
		this.min = max;
		this.max = min;
	} else {
		this.max = max;
		this.min = min;
	}
	this.step = step;
	this.increment = increment;
	this.getStep();
};
StepperOscillate.prototype = Object.create(Stepper);


StepperOscillate.prototype.doMinMaxLinier = function () {
	'use strict';
	if (this.step > this.max) {
		// bounce _step off max
		this.step = this.max - (this.step - this.max);
		this.increment = -this.increment;
	} else if (this.step < this.min) {
		// bounce _step off min
		this.step = this.min + (this.min - this.step);
		this.increment = -this.increment;
	}
};

StepperOscillate.prototype.doMinMaxReset = function () {
	'use strict';
	this.step += this.increment;
	if (this.step > this.max) {
		// bounce _step off max
		this.step = this.min + (this.step - this.max);
	}
};

StepperOscillate.prototype.doMinMaxCurve = function () {
	'use strict';
	// calculate the X coordinate on a curve at a given angle
};

StepperOscillate.prototype.doMinMax = StepperOscillate.doMinMaxLinier;


StepperOscillate.prototype.getStep = function () {
	'use strict';
	return this.increment;
};

StepperOscillate.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;
	this.step += this.increment;
	return this.doMinMax(this.step);
};


StepperOscillate.prototype.setIncrementMode = function (mode) {
	'use strict';
	if (mode === undefined || typeof mode !== 'String') {
		throw {'message': 'StepperOscillate.setMode() expects only parameter to be a string. ' + typeof mode + ' given.'};
	} else if (mode === 'linier') {
		this.doMinMax = this.doMinMaxLinier;
	} else if (mode === 'reset') {
		this.doMinMax = this.doMinMaxReset;
	} else if (mode === 'curve') {
		this.doMinMax = this.doMinMaxCurve;
	} else {
		throw {'message': 'StepperOscillate.setMode() expects only parameter to be a string matching: "linier", "reset" or "curve". "' + mode + '" given.'};
	}
};

StepperOscillate.prototype.setDoCumulative = function (mode) {
	'use strict';
	if (mode === undefined || typeof mode !== 'Boolean') {
		throw {'message': 'StepperOscillate.setMode() expects only parameter to be boolean. ' + typeof mode + ' given.'};
	} else if (mode === true) {
		this.getStep = function () {
			return this.step;
		};
	} else {
		this.getStep = function () {
			return this.increment;
		};
	}
};





//  END:  StepperOscillate
// ==================================================================
// START: StepperCircular






/*
var StepperCircular = function () {
	'use strict';
};
StepperCircular.prototype = Object.create(Stepper);
*/






//  END:  StepperCircular
// ==================================================================
// START: StepperEliptic






/*
var StepperEliptic = function () {
	'use strict';
};
StepperCircular.prototype = Object.create(Stepper);
*/






//  END:  StepperEliptic
// ==================================================================
