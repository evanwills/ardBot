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







function IncrementManager(step) {
	'use strict';
	if (typeof step !== 'number') {
		throw {"message": 'IncrementManager constructor expects only parameter "step" to be a number'};
	}
	this.step = step;
}
IncrementManager.prototype = new IIncrementManager();
IncrementManager.prototype.constructor = IncrementManager;
IIncrementManager.prototype.steps = 0;

IncrementManager.prototype.updateStep = function () {
	'use strict';
	this.steps += 1;
};
IncrementManager.prototype.getSteps = function () {
	'use strict';
	return this.steps;
};






//  END:  IncrementManager interface
// ==================================================================
// START: IncrementDecorator interface







function IIncrementDecorator(IncMan) {
	'use strict';
}
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
// START: IncrementDecoratorDecay







function IncrementDecoratorDecay(IncMan, decay) {
	'use strict';
	if (!IncMan instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorDecay constructor expects first parameter to be an instance of IIncrementManager.'};
	}

	if (typeof decay !== 'number') {
		throw {"message": 'IncrementDecoratorDecay constructor expects second parameter "decay" to be a number'};
	}
	this.incMgr = IncMan;
	this.decayFactor = decay;
}
IncrementDecoratorDecay.prototype = new IIncrementDecorator();
IncrementDecoratorDecay.prototype.constructor = IncrementDecoratorDecay;

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
	if (!IncMan instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorCumulative constructor expects first parameter to be an instance of IIncrementManager.'};
	}
	this.incMgr = IncMan;

	this.isCumulative = true;
	this.isInfinite = true;
}
IncrementDecoratorCumulative.prototype = new IIncrementDecorator();
IncrementDecoratorCumulative.prototype.constructor = IncrementDecoratorCumulative;
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







function IncrementDecoratorReset(IncMan, min, max) {
	'use strict';
	if (!IncMan instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects first parameter to be an instance of IIncrementManager.'};
	}

	if (!min instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects second parameter "min" to be an instance of IIncrementManager.'};
	}
	if (!max instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects third parameter "max" to be an instance of IIncrementManager.'};
	}
	this.incMgr = IncMan;
	this.min = min;
	this.max = max;

	this.isCumulative = true;
	this.isInfinite = false;
}
IncrementDecoratorReset.prototype = new IIncrementDecorator();
IncrementDecoratorReset.prototype.constructor = IncrementDecoratorReset;
IncrementDecoratorReset.prototype.min = null;
IncrementDecoratorReset.prototype.max = null;

IncrementDecoratorReset.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.step;
	this.incMgr.updateStep();
	this.min.updateStep();
	this.max.updateStep();
	this.step += this.incMgr.getStep();
	if (this.step > this.max.getStep()) {
		this.step = this.min.getStep() + this.step - this.max.getStep();
	} else if (this.step < this.min.getStep()) {
		this.step = this.max.getStep() - this.min.getStep() + this.step;
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
	this.incMgr.getStep();
};







//  END:  IncrementDecoratorReset
// ==================================================================
// START: IncrementDecoratorOscillate







function IncrementDecoratorOscillate(IncMan, min, max) {
	'use strict';
	if (!IncMan instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects first parameter to be an instance of IIncrementManager.'};
	}

	if (!min instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects second parameter "min" to be an instance of IIncrementManager.'};
	}
	if (!max instanceof IIncrementManager) {
		throw {"message": 'IncrementDecoratorReset constructor expects third parameter "max" to be an instance of IIncrementManager.'};
	}
	this.incMgr = IncMan;
	this.min = min;
	this.max = max;
	this.isCumulative = false;
	this.isInfinite = false;
	this.doesOscillate = true;

}
IncrementDecoratorOscillate.prototype = new IncrementDecoratorReset();
IncrementDecoratorOscillate.prototype.constructor = IncrementDecoratorOscillate;
IncrementDecoratorOscillate.prototype.cumulative = 0;
IncrementDecoratorOscillate.prototype.isNegative = false;

IncrementDecoratorOscillate.prototype.updateStep = function () {
	'use strict';
	this.lastStep = this.cumulative;
	this.incMgr.updateStep();
	this.min.updateStep();
	this.max.updateStep();

	if (this.cumulative > this.max.getStep()) {
		this.step = this.max.getStep() - this.cumulative;
		this.isNegative = true;
	} else if (this.cumulative < this.min.getStep()) {
		this.step = this.cumulative - this.min.getStep();
		this.isNegative = false;
	} else {
		this.step = this.incMgr.getStep();
		if (this.isNegative === true) {
			this.step = -this.step;
		}
	}
	this.cumulative += this.step;
};







//  END:  IncrementDecoratorOscillate
// ==================================================================






