#include "Increment-Manager.h"


// ==================================================================
// START: IncrementManager Interface







bool IIncrementManager::isCumulative() {
	return _isCumulative;
};
bool IIncrementManager::isInfinite() {
	return _isInfinite;
}
bool IIncrementManager::doesOscillate() {
	return _doesOscillate;
};

void IIncrementManager::_correctMinMax( double &min, double &max) {
	double tmp;
	if( min > max )
	{
		tmp = min;
		min = max;
		max = tmp;
	}
}







//  END:  IncrementManager Interface
// ========================================================
// START: IncrementDecorator Abstract








unsigned int AIncrementDecorator::getStepCount() {
	return incMgr.getStepCount();
}




//  END:  IncrementDecorator Abstract
// ========================================================
// START: IncrementManager





IncrementManager::IncrementManager(double step) {
	_step = step;
};
/// makes increment change (if it can)
/// must be called once for every loop
void IncrementManager::updateStep() {
	_stepCount += 1;
};

/// returns the current step value
double IncrementManager::getStep() {
	return _step;
};

/// returns the number of steps the increment manager has done
unsigned int IncrementManager::getStepCount() {
	return _stepCount;
};

/// returns the current increment value
double IncrementManager::getIncrement() {
	return _step;
};

/// returns the previous step
double IncrementManager::getLastStep() {
	return _step;
};

/// returns the minimum value the step/increment/cumulative can be
double IncrementManager::getMin() {
	return _step;
};

/// returns the maximum value the step/increment/cumulative can be
double IncrementManager::getMax() {
	return _step;
};

bool IncrementManager::withinMinMax(double min, double max) {
	_correctMinMax(min,max);

	if( _step >= min && _step <= max )
	{
		return true;
	}
	else
	{
		return false;
	}
};






//  END:  IncrementManager
// ========================================================
// START: IncrementDecoratorAccumulate





IncrementDecoratorAccumulate::IncrementDecoratorAccumulate( IIncrementManager incMan ) {
	_incMgr = incMan
}
IncrementDecoratorAccumulate::IncrementDecoratorAccumulate( IIncrementManager incMan , double preset ) {
	_incMgr = incMan
	_cumulative = preset;
}
void IncrementDecoratorAccumulate::updateStep() {
	_incMgr.updateStep();
	_lastStep = _cumulative;;
	_cumulative += _incMgr.getStep();
}
double IncrementDecoratorAccumulate::getStep() {
	return _cumulative;
}
double IncrementDecoratorAccumulate::getIncrement() {
	return _incMgr.getStep();
}
double IncrementDecoratorAccumulate::getLastStep() {
	return _lastStep;
}
bool IncrementDecoratorAccumulate::withinMinMax() {
	return false;
}
double IncrementDecoratorAccumulate::getMin() {
	// this requires much more thought (and is possibly impossible to work out)
	//if(incMgr.getStep() > 0)
}
double IncrementDecoratorAccumulate::getMax() {
	// this requires much more thought (and is possibly impossible to work out)
	//if(incMgr.getStep() > 0)
}





//  END:  IncrementDecoratorAccumulate
// --------------------------------------------------------
// START: IncrementDecoratorAccumulatorReset





IncrementDecoratorAccumulatorReset::IncrementDecoratorAccumulatorReset(IIncrementManager incMan, IIncrementManager min , IIncrementManager max) {
	_incMgr = incMan;
	_setCorrectMinMax(min,max);
	_cumulative = _min.getStep();
}
IncrementDecoratorAccumulatorReset::IncrementDecoratorAccumulatorReset(IIncrementManager IncMan, IIncrementManager min , IIncrementManager max, double preset) {
	_incMgr = IncMan;
	_setCorrectMinMax(min,max);
	_cumulative = preset;
}
void IncrementDecoratorAccumulatorReset::updateStep() {
	_incMgr.updateStep();
	_min.updateStep();
	_max.updateStep();

	_lastStep = _step;

	double min = _min.getStep();
	double max = _max.getStep();

	_cumulative += _incMgr.getStep();

	if( _cumulative > max )
	{
		_cumulative = min + (_cumulative - max);
	}
	else
	{
		if( _cumulative < min )
		{
			_cumulative = max - (min - _cumulative);
		}
	}
}

double IncrementDecoratorAccumulatorReset::getStep() {
	return _cumulative;
}

bool IncrementDecoratorAccumulatorReset::withinMinMax(double min, double max) {
	_correctMinMax(min, max);
	if(_min.getMin() >= min && _max.getMax() <= max)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/// returns the minimum value the step/increment/cumulative can be
double IncrementDecoratorAccumulatorReset::getMin() {
	return _min.getStep();
};

/// returns the maximum value the step/increment/cumulative can be
double IncrementDecoratorAccumulatorReset::getMax() {
	return _max.getStep();
};


void IncrementDecoratorAccumulatorReset::_setCorrectMinMax(double min, double max) {
	if( min.getStep() > max.getStep() )
	{
		_min = max;
		_max = min;
	}
	else
	{
		_min = min;
		_max = max;
	}
};





//  END:  IncrementDecoratorAccumulatorReset
// ========================================================
// START: IncrementDecoratorAccumulatorOscillate



void IncrementDecoratorAccumulatorOscillate::updateStep() {
	_incMgr.updateStep();
	_min.updateStep();
	_max.updateStep();

	_lastStep = _cumulative;

	double min = _min.getStep();
	double max = _max.getStep();

	_cumulative += _incMgr.getStep();

	if( _cumulative > max )
	{
		_cumulative = min + (_cumulative - max);
	}
	else
	{
		if( this._cumulative < min )
		{
			this._cumulative = max - (min - this._cumulative);
		}
	}
}

double IncrementDecoratorAccumulatorOscillate::getStep() {
	return this._cumulative;
}
double IncrementDecoratorAccumulatorOscillate::getIncrement() {
	return _step - _lastStep;
}


//  END:  IncrementDecoratorAccumulatorOscillate
// ========================================================
// START: IncrementDecoratorDecay



IncrementDecoratorDecay::IncrementDecoratorDecay(IIncrementManager incMan, double decayFactor) {
	_incMgr = incMan;
	_decayFactor = decayFactor;
	_lastStep = _incMgr.getStep();
	_step = _incMgr.getStep();
}
double IncrementDecoratorDecay::updateStep() {
	_incMgr.updateStep();
	_lastStep = _step;
	_decayValue *= _decayFactor;
	_step *= _decayValue;
}

double IncrementDecoratorDecay::getStep() {
	return _step;
}

bool IncrementDecoratorDecay::withinMinMax(double min, double max) {
	_correctMinMax(min,max);
	if( _decayFactor <= 1 && _decayFactor >= 0 && _incMgr.getStep() <= max && _incMgr.getStep() >= min && min <= 0 )
	{
		return true;
	}
	return false;
}

/// returns the minimum value the step/increment/cumulative can be
double IncrementDecoratorDecay::getMin() {
	double tmp = incMgr.getStep();
	if( _decayFactor <= 1 && _decayFactor >= 0 )
	{
		if(tmp > 0)
		{
			return 0;
		} else {
			return tmp;
		}
	}
	else if(_decayFactor >= -1 && _decayFactor <= 0)
	{
		return -tmp;
	}
	else if(_decayFactor > 1)
	{
		return tmp;
	}
	else
	{
		// _decayFactor must be less than -1
		// throw // not sure what to do here
	}
}

/// returns the maximum value the step/increment/cumulative can be
double IncrementDecoratorDecay::getMax() {
	double tmp = incMgr.getStep();
	if( _decayFactor <= 1 && _decayFactor >= 0 )
	{
		if(tmp > 0)
		{
			return tmp;
		} else {
			return 0;
		}
	}
	else if(_decayFactor >= -1 && _decayFactor <= 0)
	{
		return tmp;
	}
	else if(_decayFactor > 1)
	{
		if( tmp < 0 )
		{
			return tmp;
		}
		else
		{
			// throw // not sure what to do here
		}
	}
	else
	{
		// _decayFactor must be less than -1
		// throw // not sure what to do here
	}
}


double IncrementDecoratorDecay::getIncrement() {
	return _step - _lastStep;
}


//  END:  IncrementDecoratorDecay
// ========================================================