// IncrementManager fixed needs some rethinking I'm pretty sure the cumulative stuff is unnecessary


function IncrementManager() {
	'use strict';
	this.cumulative = 0;
	this.cumulativeMin = 0;
	this.cumulativeMax = 0;
	this._isCumulative = false;
	this._isInfinite = false;
	this._doesOscillate = false;
	this.step = 0;
	this.steps = 0;
}

IncrementManager.prototype = new Object();
IncrementManager.prototype.constructor = IncrementManager;

IncrementManager.prototype.updateStep = function () {
	'use strict';
	throw {"message": 'The inner workings of ' + this.constructor.name + '.updateStep() are undefined' };
};

IncrementManager.prototype.getStep = function () {
	'use strict';
	return this.step;
};

IncrementManager.prototype.getIncrement = function () {
	'use strict';
	throw {"message": 'The inner workings of ' + this.constructor.name + '.getIncrement() are undefined' };
};

IncrementManager.prototype.getLastStep = function () {
	'use strict';
	throw {"message": 'The inner workings of ' + this.constructor.name + '.getLastStep() are undefined' };
};

IncrementManager.prototype.getMin = function () {
	'use strict';
	throw {"message": 'The inner workings of ' + this.constructor.name + '.getMin() are undefined' };
};

IncrementManager.prototype.getMax = function () {
	'use strict';
	throw {"message": 'The inner workings of ' + this.constructor.name + '.getMax() are undefined' };
};

IncrementManager.prototype.getSteps = function () {
	'use strict';
	return this.steps;
};

IncrementManager.prototype._correctMinMax = function (min, max) {
	'use strict';
	if (min > max) {
		return [max, min];
	} else {
		return [min, max];
	}
};

IncrementManager.prototype.isCumulative = function () {
	'use strict';
	return this._isCumulative;
};

IncrementManager.prototype.isInfinite = function () {
	'use strict';
	return this._isInfinite;
};

IncrementManager.prototype.doesOscillate = function () {
	'use strict';
	return this._doesOscillate;
};

IncrementManager.prototype._validateMinMax = function (min, max) {
	'use strict';

	if (typeof min !== 'number') {
		throw {'message': this.constructor.name + '.withinMinMax() expects first parameter "min" to be a number. ' + typeof min + ' given!'};
	}
	if (typeof max !== 'number') {
		throw {'message': this.constructor.name + '.withinMinMax() expects second parameter "max" to be a number. ' + typeof max + ' given!'};
	}
	if (min > max) {
		throw {'message': this.constructor.name + '.withinMinMax() expects "min" to be less than or equal to "max". min (' + min + ') > max (' + max + ')'};
	}

	return this._correctMinMax(min, max);
};

IncrementManager.prototype.withinMinMax = function (min, max) {
	'use strict';
	var tmp = this._validateMinMax(min, max);

	if (this.step > tmp[1] || this.step < min[0]) {
		return false;
	}
	return true;
};

IncrementManager.prototype._validateSetDoCumParam = function (min, max, presetCumulative) {
	'use strict';
	var tmp;
	if (typeof min !== 'number') {
		throw {"message": this.constructor.name + '.setDoCumulative() expects first param "min" to be undefined or a number. ' + typeof min + ' given.'};
	}
	if (typeof max !== 'number') {
		throw {"message": this.constructor.name + '.setDoCumulative() expects second parm "max" to be a number. ' + typeof max + ' given.'};
	}

	tmp = this._correctMinMax(min, max);
	this.cumulativeMin = tmp[0];
	this.cumulativeMax = tmp[1];

	if (presetCumulative !== undefined) {
		if (typeof presetCumulative !== 'number') {
			throw {"message": this.constructor.name + '.setDoCumulative() expects fourth parm "presetCumulative" to be a number. ' + typeof presetCumulative + ' given.'};
		} else if (presetCumulative < this.cumulativeMin || presetCumulative > this.cumulativeMax) {
			throw {"message": this.constructor.name + '.setDoCumulative() expects fourth parm "presetCumulative" to be greater than or equal to ' + min + ' and less than or equal to ' + max + '. ' + presetCumulative + ' given.'};
		} else {
			this.cumulative = presetCumulative;
		}
	} else {
		this.cumulative = this.cumulativeMin;
	}
};

IncrementManager.prototype.setDoCumulative = function (min, max, mode, presetCumulative) {
	'use strict';
	var tmp = [];

	if (this._isCumulative === true) {
		return;
	}

	this._isCumulative = true;

	if (min === undefined) {
		this._isInfinite = true;
		this.updateStep = function () {
			// infinite accumulation mode
			this.cumulative += this.step;
		};
		this.getStep = function () {
			// infinite accumulation mode
			return this.cumulative;
		};
		this.getMax = function () {
			return undefined;
		};
	} else {
		if (mode !== 'reset' && mode !== 'oscillate') {
			mode = 'reset';
		}
		this._validateSetDoCumParam(min, max, presetCumulative);

		if (mode === 'reset') {
			// run doCumulative in Reset mode
			// i.e. when the value of cumulative reaches the min or max,
			// reset it to the other end and apply any excess to that value
			this.updateStep = function () {
				this.steps += 1;
				this.cumulative += this.step;

				if (this.cumulative > this.cumulativeMax) {
					this.cumulative = this.cumulativeMin + (this.cumulative - this.cumulativeMax);
				} else if (this.cumulative < this.cumulativeMin) {
					this.cumulative = this.cumulativeMax - (this.cumulative + this.cumulativeMin);
				}
			};
		} else {
			// run doCumulative in Oscillate mode
			// i.e. when the value of cumulative reaches the min or max,
			// reset it to the other end and apply any excess to that value
			this._doesOscillate = true;
			this.updateStep = function () {
				this.steps += 1;
				this.cumulative += this.step;

				if (this.cumulative >= this.cumulativeMax) {
					this.step = -this.step;
					this.cumulative = this.cumulativeMax - (this.cumulative - this.cumulativeMax);
				} else if (this.cumulative <= this.cumulativeMin) {
					this.step = -this.step;
					this.cumulative = this.cumulativeMin + (this.cumulative + this.cumulativeMin);
				}
			};
		}
		this.getStep = function () {
			return this.cumulative;
		};

		// because we're returning the cumulative value
		this.getMin = function () {
			return this.cumulativeMin;
		};
		this.getMax = function () {
			return this.cumulativeMax;
		};

		this.withinMinMax = function (min, max) {
			var tmp = this._validateMinMax(min, max);

			if (this.cumulativeMin < tmp[0] || this.cumulativeMax > tmp[1]) {
				return false;
			}
			return true;
		};
	}
};

IncrementManager.prototype.getType = function () {
	'use strict';
	return this.prototype.constructor.name;
};

IncrementManager.prototype.reverseStep = function () {
	'use strict';
	this.step = -this.step;
};





//  END:  IncrementManager (interface)
// ==================================================================
// START: IncrementFixed






function IncrementFixed(step) {
	'use strict';
	if (typeof step !== 'number') {
		throw {'message': 'IncrementFixed expects only parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	this.step = step;
}

IncrementFixed.prototype = new IncrementManager();
IncrementFixed.prototype.constructor = IncrementFixed;

IncrementFixed.prototype.updateStep = function () {
	'use strict';
	this.steps += 1;
	this.cumulative += this.step;
	// do nothing
};

IncrementFixed.prototype.getIncrement = function () {
	'use strict';
	return 0;
};

IncrementFixed.prototype.getLastStep = function () {
	'use strict';
	return this.step;
};

IncrementFixed.prototype.getMin = function () {
	'use strict';
	return this.step;
};

IncrementManager.prototype.getMax = function () {
	'use strict';
	return this.step;
};





//  END:  IncrementFixed
// ==================================================================
// START: IncrementDecay





/**
 * supplies an ever decreasing step
 * @param {number} step        the value that will be returned
 * @param {number} decayFactor [[Description]]
 */
function IncrementDecay(step, decayFactor) {
	'use strict';
	if (typeof step !== 'number') {
		throw {'message': 'IncrementDecay expects first parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	if (typeof decayFactor !== 'number') {
		throw {'message': 'IncrementDecay expects second parameter "decayFactor" to be a number. ' + typeof decayFactor + ' given!'};
	}
	if (decayFactor <= 0 || decayFactor > 1) {
		throw {'message': 'IncrementDecay expects second parameter "decayFactor" to be a number between zero and one. ' + decayFactor + ' given!'};
	}
	this.step = step;
	this.min = 0;
	this.max = step;
	this.decayFactor = decayFactor;
	this.cumulativeMid = 0;
	this.lastCumulative = 0;
}

//IncrementDecay.prototype = Object.create(IncrementManager);

IncrementDecay.prototype = new IncrementManager();
IncrementDecay.prototype.constructor = IncrementDecay;

IncrementDecay.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;
	this.step *= this.decayFactor;
	this.cumulative += this.step;
	this.steps += 1;
};

IncrementDecay.prototype.getIncrement = function () {
	'use strict';
	return this.lastStep - this.step;
};

IncrementDecay.prototype.getLastStep = function () {
	'use strict';
	return this.lastStep;
};

IncrementDecay.prototype.getMin = function () {
	'use strict';
	return 0;
};

IncrementDecay.prototype.getMax = function () {
	'use strict';
	return this.step;
};

IncrementDecay.prototype.getDecay = function () {
	'use strict';
	return this.decayFactor;
};

IncrementDecay.prototype.setDoCumulative = function (min, max, mode, presetCumulative) {
	'use strict';
	var previousStep = 0,
		tmp = [];

	if (this._isCumulative === true) {
		return;
	}

	this._isCumulative = true;

	if (min === undefined) {
		this._isInfinite = true;
		this.getStep = function () {
			// infinite accumulation mode
			return this.cumulative;
		};
		this.getMax = function () {
			return undefined;
		};
	} else {
		if (mode !== 'reset' && mode !== 'oscillate') {
			mode = 'reset';
		}
		this._validateSetDoCumParam(min, max, presetCumulative);

		if (mode === 'reset') {
			// run doCumulative in Reset mode
			// i.e. when the value of cumulative reaches the min or max,
			// reset it to the other end and apply any excess to that value
			this.updateStep = function () {
				this.steps += 1;
				this.step *= this.decayFactor;
				this.cumulative += this.step;

				if (this.cumulative > this.cumulativeMax) {
					this.cumulative = this.cumulativeMin + (this.cumulative - this.cumulativeMax);
				} else if (this.cumulative < this.cumulativeMin) {
					this.cumulative = this.cumulativeMax - (this.cumulative + this.cumulativeMin);
				}
			};
		} else {
			this._doesOscillate = true;
			this.updateStep = function () {
				this.steps += 1;
				this.step *= this.decayFactor;
				this.cumulative += this.step;
				if (this.cumulative > this.cumulativeMax) {
					this.step = -this.step;
					this.cumulative = this.cumulativeMax - (this.cumulative - this.cumulativeMax);
				} else if (this.cumulative < this.cumulativeMin) {
					this.step = -this.step;
					this.cumulative = this.cumulativeMin + (this.cumulativeMin - this.cumulative);
				}
			};
		}
		this.getStep = function () {
			return this.cumulative;
		};

		// because we're returning the cumulative value
		this.getMin = function () {
			return this.cumulativeMin;
		};
		this.getMax = function () {
			return this.cumulativeMax;
		};

		this.withinMinMax = function (min, max) {
			var tmp = this._validateMinMax(min, max);

			if (this.cumulativeMin < tmp[0] || this.cumulativeMax > tmp[1]) {
				return false;
			}
			return true;
		};
	}
};




//  END:  IncrementDecay
// ==================================================================
// START: IncrementOscillate






function IncrementOscillate(step, increment, min, max) {
	'use strict';

	var tmp = [];

	this.doMinMax = this.doMinMaxLinier;

	if (typeof step !== 'number') {
		throw {'message': 'IncrementOscillate expects first parameter "step" to be a number. ' + typeof step + ' given!'};
	}
	if (typeof increment !== 'number') {
		throw {'message': 'IncrementOscillate expects second parameter "increment" to be a number. ' + typeof increment + ' given!'};
	}
	if (typeof min !== 'number') {
		throw {'message': 'IncrementOscillate expects third parameter "min" to be a number. ' + typeof min + ' given!'};
	}
	if (typeof max !== 'number') {
		throw {'message': 'IncrementOscillate expects fourth parameter "max" to be a number. ' + typeof max + ' given!'};
	}

	tmp = this._correctMinMax(min, max);

	this.min = tmp[0];
	this.max = tmp[1];
	this.step = step;
	this.increment = increment;
	this.getStep();
}
//IncrementOscillate.prototype = Object.create(IncrementManager);
IncrementOscillate.prototype = new IncrementManager();
IncrementOscillate.prototype.constructor = IncrementOscillate;


IncrementOscillate.prototype.doMinMaxLinier = function () {
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

IncrementOscillate.prototype.doMinMaxReset = function () {
	'use strict';
	this.step += this.increment;
	if (this.step > this.max) {
		// bounce _step off max
		this.step = this.min + (this.step - this.max);
	}
};

IncrementOscillate.prototype.doMinMaxCurve = function () {
	'use strict';
	// calculate the X coordinate on a curve at a given angle
};

IncrementOscillate.prototype.doMinMax = IncrementOscillate.doMinMaxLinier;


IncrementOscillate.prototype.getStep = function () {
	'use strict';
	return this.increment;
};

IncrementOscillate.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;
	this.step += this.increment;
	return this.doMinMax(this.step);
};


IncrementOscillate.prototype.setIncrementMode = function (mode) {
	'use strict';
	if (mode === undefined || typeof mode !== 'String') {
		throw {'message': 'IncrementOscillate.setMode() expects only parameter to be a string. ' + typeof mode + ' given.'};
	} else if (mode === 'linier') {
		this.doMinMax = this.doMinMaxLinier;
	} else if (mode === 'reset') {
		this.doMinMax = this.doMinMaxReset;
	} else if (mode === 'curve') {
		this.doMinMax = this.doMinMaxCurve;
	} else {
		throw {'message': 'IncrementOscillate.setMode() expects only parameter to be a string matching: "linier", "reset" or "curve". "' + mode + '" given.'};
	}
};

IncrementOscillate.prototype.setDoCumulative = function (mode) {
	'use strict';

	if (this._isCumulative === true) {
		return;
	}

	this._isCumulative = true;

	if (mode === undefined || typeof mode !== 'Boolean') {
		throw {'message': 'IncrementOscillate.setMode() expects only parameter to be boolean. ' + typeof mode + ' given.'};
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


/*
IncrementOscillate.prototype.setDoCumulative = function (doCumulative, min, max) {
	'use strict';
	var tmp = [];
	if (this.isSet === false) {
		this.isSet = true;

		if (typeof doCumulative !== 'bool') {
			throw {"message": 'doCumulative() expects first param "doCumulative" to be either TRUE or FALSE. ' + typeof doCumulative + ' given.'};
		}
		if (doCumulative === true) {
			if (min === undefined) {
				this.getStep = function () {
					return this.cumulative;
				};
			} else {
				tmp = this._correctMinMax(min, max);
				min = tmp[0];
				max = tmp[1];
				// run doCumulative in Reset mode
				// i.e. when the value of cumulative reaches the min or max,
				// reset it to the other end and apply any excess to that value
				this.getStep = function () {
					if (this.cumulative > max) {
						this.cumulative = min + (this.cumulative - max);
					} else if (this.cumulative < min) {
						this.cumulative = max - (this.cumulative + min);
					}
					return this.cumulative;
				};
			}
		} else {
			this.getStep = function () {
				return this.step;
			};
		}
	}
};
*/



//  END:  IncrementOscillate
// ==================================================================
// START: IncrementCircular






/*
var IncrementCircular = function () {
	'use strict';
};
IncrementCircular.prototype = Object.create(IncrementManager);
*/






//  END:  IncrementCircular
// ==================================================================
// START: IncrementEliptic






/*
var IncrementEliptic = function () {
	'use strict';
};
IncrementEliptic.prototype = Object.create(IncrementManager);
*/






//  END:  IncrementEliptic
// ==================================================================
