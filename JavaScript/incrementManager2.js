/**
 * incrementManager2 uses Decorators to simplify the inheritance
 * hierarchy.
 */



// ==================================================================
// START: IncrementManager Interface







function IIncrementManager() {
	'use strict';
}
IIncrementManager.prototype = new Object();
IIncrementManager.prototype.constructor = IIncrementManager;

IIncrementManager.prototype.step = 0;
IIncrementManager.prototype.isCumulative = false;
IIncrementManager.prototype.isInfinite = false;
IIncrementManager.prototype.doesReset = false;
IIncrementManager.prototype.doesOscillate = false;

IIncrementManager.prototype.updateStep = function () {
	'use strict';
};

IIncrementManager.prototype.getStep = function () {
	'use strict';
	return this.step;
};
IIncrementManager.prototype.getSteps = function () {
	'use strict';
};
IIncrementManager.prototype.getIncrement = function () {
	'use strict';
	return 0;
};
IIncrementManager.prototype.getMin = function () {
	'use strict';
	return this.step;
};
IIncrementManager.prototype.getMax = function () {
	'use strict';
	return this.step;
};
IIncrementManager.prototype.getLastStep = function () {
	'use strict';
	return this.step;
};







//  END:  IncrementManager interface
// ==================================================================
// START: IncrementDecorator interface







function IIncrementDecorator(IncMan) {
	'use strict';
}
//IIncrementDecorator.prototype = Object.create(IIncrementManager.prototype);
IIncrementDecorator.prototype = new IIncrementManager();
IIncrementDecorator.prototype.constructor = IIncrementDecorator;
IIncrementDecorator.prototype.incMgr = null;
IIncrementDecorator.prototype.lastStep = 0;
IIncrementDecorator.prototype.getLastStep = function () {
	'use strict';
	return this.lastStep;
};

IIncrementDecorator.prototype.getIncrement = function () {
	'use strict';
	return this.lastStep - this.step;
};
IIncrementDecorator.prototype.getSteps = function () {
	'use strict';
	return this.incMgr.getSteps();
};







//  END:  IncrementDecorator interface
// ==================================================================
// START: IncrementManager







function IncrementManager(step) {
	'use strict';
	var msg = '';
	if (typeof step !== 'number') {
		msg = 'IncrementManager constructor expects only parameter "step" to be a number';
		console.error(msg);
		throw {"message": msg};
	}
	this.step = step;
}
//IncrementManager.prototype = Object.create(IIncrementManager.prototype);
IncrementManager.prototype = new IIncrementManager();
IncrementManager.prototype.constructor = IncrementManager;
IncrementManager.prototype.steps = 0;

IncrementManager.prototype.updateStep = function () {
	'use strict';
	this.steps += 1;
};
IncrementManager.prototype.getSteps = function () {
	'use strict';
	return this.steps;
};







//  END:  IncrementManager
// ==================================================================
// START: IncrementDecoratorDecay







function IncrementDecoratorDecay(IncMan, decay) {
	'use strict';
	var msg = 'IncrementDecoratorDecay constructor expects ';
	if (!IncMan instanceof IIncrementManager) {
		msg += 'first parameter to be an instance of IIncrementManager.';
		console.error(msg);
		throw {"message": msg};
	}

	if (typeof decay !== 'number') {
		msg += 'second parameter "decay" to be a number';
		console.error(msg);
		throw {"message": msg};
	}

	this.incMgr = IncMan;
	this.decayFactor = decay;
}
//IncrementDecoratorDecay.prototype = Object.create(IIncrementDecorator.prototype);
IncrementDecoratorDecay.prototype = new IIncrementDecorator();
IncrementDecoratorDecay.prototype.constructor = IncrementDecoratorDecay;

IncrementDecoratorDecay.prototype.isCumulative = false;
IncrementDecoratorDecay.prototype.isInfinite = false;
IncrementDecoratorDecay.prototype.doesOscillate = false;
IncrementDecoratorDecay.prototype.doesReset = false;
IncrementDecoratorDecay.prototype.decayFactor = 0;
IncrementDecoratorDecay.prototype.decayValue = 1;

IncrementDecoratorDecay.prototype.getMin = function () {
	'use strict';
	if (this.decayFactor < 1 && this.decayFactor > -1) {
		return 0;
	} else {
		return this.incMgr.getStep();
	}
};
IncrementDecoratorDecay.prototype.getMax = function () {
	'use strict';
	if (this.decayFactor < 1 && this.decayFactor > -1) {
		return this.incMgr.getStep();
	} else {
		return false;
	}
};
IncrementDecoratorDecay.prototype.updateStep = function () {
	'use strict';
	this.decayValue *= this.decayFactor;
	this.lastStep = this.step;
	this.incMgr.updateStep();
	this.step = this.decayValue * this.incMgr.getStep();
};







//  END:  IncrementDecoratorDecay
// ==================================================================
// START: IncrementDecoratorCumulative







function IncrementDecoratorCumulative(IncMan) {
	'use strict';
	var msg = '';
	if (!IncMan instanceof IIncrementManager) {
		msg = 'IncrementDecoratorCumulative constructor expects first parameter to be an instance of IIncrementManager.';
		console.error(msg);
		throw {"message": msg};
	}
	this.incMgr = IncMan;
}
//IncrementDecoratorCumulative.prototype = Object.create(IIncrementDecorator.prototype);
IncrementDecoratorCumulative.prototype = new IIncrementDecorator();
IncrementDecoratorCumulative.prototype.constructor = IncrementDecoratorCumulative;
IncrementDecoratorCumulative.prototype.isCumulative = true;
IncrementDecoratorCumulative.prototype.isInfinite = true;
IncrementDecoratorCumulative.prototype.doesOscillate = false;
IncrementDecoratorCumulative.prototype.doesReset = false;
IncrementDecoratorCumulative.prototype.updateStep = function () {
	'use strict';
	this.incMgr.updateStep();
	this.step += this.incMgr.getStep();
};
IncrementDecoratorCumulative.prototype.getMax = function () {
	'use strict';
	return false;
};







//  END:  IncrementDecoratorCumulative
// ==================================================================
// START: IncrementDecoratorReset







function IncrementDecoratorReset(IncMan, min, max, preset) {
	'use strict';

	var tmp = 0,
		tmp2 = 0,
		msg = this.constructor.name + ' constructor expects ';

	if (!IncMan instanceof IIncrementManager) {
		msg += 'first parameter to be an instance of IIncrementManager.';
		console.error(msg);
		throw {"message": msg};
	}
	this.incMgr = IncMan;
	if (!min instanceof IIncrementManager) {
		msg += 'second parameter "min" to be an instance of IIncrementManager.';
		console.error(msg);
		throw {"message": msg};
	}
	if (!max instanceof IIncrementManager) {
		msg += 'third parameter "max" to be an instance of IIncrementManager.';
		console.error(msg);
		throw {"message": msg};
	}
	if (min.getStep() > max.getStep()) {
		msg += 'second parameter min.getStep() to be less than third parameter max.getStep()';
		console.error(msg);
		throw {"message": msg};
	}

	tmp = max.getStep() - min.getStep();
	tmp2 = IncMan.getStep();
	if (tmp2 < 0) {
		tmp2 = -tmp2;
	}
	if (tmp2 > tmp) {
		msg += 'first parameter "IncMan" (' + IncMan.getStep() + ') to be a number that can be made to fit within ' + min.getStep() + ' and ' + max.getStep();
		console.error(msg);
		throw {"message": msg};
	}

	this.min = min;
	this.max = max;

	if (preset !== undefined) {
		if (typeof preset !== 'number' || preset < 0 || preset > 1) {
			msg += 'fourth parameter "preset" to be a number between 0 and 1 (inclusive).';
			console.error(msg);
			throw {"message": msg};
		} else {
			this.step = this.min.getStep() + ((this.max.getStep() - this.min.getStep()) * preset);
		}
	} else {
		this.step = min.getStep();
	}
}
//IncrementDecoratorCumulative.prototype = Object.create(IIncrementDecorator.prototype);
IncrementDecoratorReset.prototype = new IIncrementDecorator();
IncrementDecoratorReset.prototype.constructor = IncrementDecoratorReset;
IncrementDecoratorReset.prototype.min = null;
IncrementDecoratorReset.prototype.max = null;
IncrementDecoratorReset.prototype.isCumulative = true;
IncrementDecoratorReset.prototype.doesReset = true;
IncrementDecoratorReset.prototype.cumulative = 0;

IncrementDecoratorReset.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;

	this.incMgr.updateStep();
	this.min.updateStep();
	this.max.updateStep();
	this.step += this.incMgr.getStep();

	if (this.step === this.max.getStep()) {
		this.step = this.min.getStep();
	} else if (this.step === this.min.getStep()) {
		this.step = this.max.getStep();
	} else if (this.step > this.max.getStep()) {
		this.step = this.min.getStep() + this.step - this.max.getStep();
	} else if (this.step < this.min.getStep()) {
		this.step = this.max.getStep() - (this.min.getStep() - this.step);
	}
};
IncrementDecoratorReset.prototype.getMin = function () {
	'use strict';
	this.max.getStep();
};
IncrementDecoratorReset.prototype.getMax = function () {
	'use strict';
	this.min.getStep();
};
IncrementDecoratorReset.prototype.getLastStep = function () {
	'use strict';
	this.lastStep;
};







//  END:  IncrementDecoratorReset
// ==================================================================
// START: IncrementDecoratorOscillate







function IncrementDecoratorOscillate(IncMan, min, max, preset) {
	'use strict';
	IncrementDecoratorReset.call(this, IncMan, min, max, preset);
//	this.constructorFuncShared(IncMan, min, max, preset);
}
//IncrementDecoratorCumulative.prototype = Object.create(IncrementDecoratorReset.prototype);
IncrementDecoratorOscillate.prototype = new IncrementDecoratorReset(new IncrementManager(0), new IncrementManager(0), new IncrementManager(0));
IncrementDecoratorOscillate.prototype.constructor = IncrementDecoratorOscillate;
IncrementDecoratorOscillate.prototype.isCumulative = true;
IncrementDecoratorOscillate.prototype.isInfinite = false;
IncrementDecoratorOscillate.prototype.doesOscillate = true;
IncrementDecoratorOscillate.prototype.doesReset = false;
IncrementDecoratorOscillate.prototype.cumulative = 0;
IncrementDecoratorOscillate.prototype.lastCumulative = 0;
IncrementDecoratorOscillate.prototype.changeSign = false;


IncrementDecoratorOscillate.prototype.updateStep = function () {
	'use strict';
	var step;
	this.lastCumulative = this.cumulative;
	this.incMgr.updateStep();
	this.min.updateStep();
	this.max.updateStep();
	this.lastStep = this.step;

	this.step = this.incMgr.getStep();
	if (this.changeSign === true) {
		this.step = -this.step;
	}

	this.cumulative += this.step;


	if (this.cumulative > this.max.getStep()) {
		this.step = this.max.getStep() - this.cumulative;
		this.cumulative = this.max.getStep() - this.step;
		this.changeSign = true;
	} else if (this.cumulative < this.min.getStep()) {
		this.step = this.cumulative - this.min.getStep();
		this.cumulative = this.min.getStep() + this.step;
		this.changeSign = false;
	}
};


IncrementDecoratorOscillate.prototype.getStep = function () {
	'use strict';
	return this.step;
};





//  END:  IncrementDecoratorOscillate
// ==================================================================






