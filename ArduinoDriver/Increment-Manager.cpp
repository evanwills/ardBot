
#include "Increment-Manager.h"


// ==================================================================
// START: IncrementManager




//  END:  IncrementManager
// ==================================================================
// START: IncrementFixed







IncrementFixed IncrementFixed::incrementFixedFactory( double step, unsigned int cumulativeMode = 0 , double min = 0 , double max = 0 , bool oscillate = false)
{
	if( cumulativeMode == 0 )
	{
		return new IncrementFixed(step);
	}
	else if( cumulativeMode == 1 )
	{
		return new IncFixedCumInfinite(step);
	}
	else if( cumulativeMode == 2 )
	{
		return new IncFixedCumReset(step, min, max);
	}
	else if( cumulativeMode == 3 )
	{
		return new IncFixedCumOscillate(step, min, max);
	}
	else
	{
		// throw
	}
}
IncrementFixed::IncrementFixed( double step )
{
	_step = step;
}
void IncrementFixed::updateStep()
{
	_cumulative += _step;
}
double IncrementFixed::getStep()
{
	return _step;
}

double IncrementFixed::getIncrement()
{
	return 0;
}

double IncrementFixed::getCumulative()
{
	return _step;
}

double IncrementFixed::getLastStep()
{
	return _step;
}

double IncrementFixed::getMin()
{
	return _step;
}

double IncrementFixed::getMax()
{
	return _step;
}

bool IncrementFixed::withinMinMax(double min, double max)
{
	double tmp;

	if( min > max ) {
		tmp = min;
		min = max;
		max = tmp;
	}

	if( _step > max || _step < min )
	{
		return false;
	}
	else
	{
		return true;
	}
}


/// presets the cumulative value
void IncrementFixed::presetCumulative( double preset )
{
	// do nothing no preset for this class
}


// --------------------------------------------------------


/// makes increment change (if it can)
/// must be called once for every loop
void IncFixedCumInfinite::updateStep()
{
	_cumulative += step;
}

/// returns the current step value
double IncFixedCumInfinite::getStep()
{
	return _cumulative;
}

/// presets the cumulative value
void IncFixedCumInfinite::presetCumulative( double preset )
{
	if( preset < _min || preset > _max)
	{
		// throw
	}
	 _cumulative = preset;
}

IncFixedCumInfinite::IncFixedCumInfinite( double step )
{
	_step = step;
}



// --------------------------------------------------------



/// makes increment change (if it can)
/// must be called once for every loop
void IncFixedCumReset::updateStep()
{
	_cumulative += step;
	if (_cumulative >= _max) {
		_cumulative = _min + (_cumulative - _max);
	} else if (_cumulative <= _min) {
		_cumulative = _max - (_cumulative + _min);
	}
}

/// returns the minimum value the step/increment/cumulative can be
double IncFixedCumReset::getMin()
{
	return _min;
}

/// returns the maximum value the step/increment/cumulative can be
double IncFixedCumReset::getMax()
{
	return _min;
}

void IncFixedCumReset::_fixMinMax()
{
	if( _min > _max ) {
		tmp = _min;
		_min = _max;
		_max = tmp;
	}
}

IncFixedCumReset::IncFixedCumReset( double step , double min , double max )
{
	double tmp;
	_step = step;
	_min= min;
	_max = max;
	this->_fixMinMax();
}


// --------------------------------------------------------

/// makes increment change (if it can)
/// must be called once for every loop
void IncFixedCumOscillate::updateStep()
{
	_cumulative += step;
	if (_cumulative >= _max) {
		_step = -_step;
		_cumulative = _max - (_cumulative - _max);
	} else if (_cumulative <= _min) {
		_step = -_step;
		_cumulative = _min + (_cumulative + _min);
	}
}







//  END:  IncrementFixed
// ==================================================================
// START: IncrementDecay







IncrementDecay IncrementDecay::IncrementDecayFactory( double step, double decayFactor, unsigned int cumulativeMode = 0 , double min = 0 , double max = 0 , bool oscillate = false)
{
	if( decayFactor < 0 || decayFactor > 1)
	{
		// throw
	}

	if( cumulativeMode == 0 )
	{
		return new IncrementDecay(step, decayFactor);
	}
	else if( cumulativeMode == 1 )
	{
		return new IncDecayCumInfinite(step, decayFactor);
	}
	else if( cumulativeMode == 2 )
	{
		return new IncDecayCumReset(step, decayFactor, min, max);
	}
	else if( cumulativeMode == 3 )
	{
		return new IncDecayCumOscillate(step, decayFactor, min, max);
	}
	else
	{
		// throw
	}
}
IncrementDecay::IncrementDecay( double step , double decayFactor )
{
	_step = step;
	_decayFactor = decayFactor;
}
void IncrementDecay::updateStep()
{
	_cumulative += _step;
}
double IncrementDecay::getStep()
{
	return _step;
}

double IncrementDecay::getIncrement()
{
	return 0;
}

double IncrementDecay::getCumulative()
{
	return _step;
}

double IncrementDecay::getLastStep()
{
	return _lastStep;
}

double IncrementDecay::getMin()
{
	return 0;
}

double IncrementDecay::getMax()
{
	return _step;
}

bool IncrementDecay::withinMinMax(double min, double max)
{
	double tmp;

	if( min > max ) {
		tmp = min;
		min = max;
		max = tmp;
	}

	if( _step > max || _step < min )
	{
		return false;
	}
	else
	{
		return true;
	}
}


/// presets the cumulative value
void IncrementDecay::presetCumulative( double preset )
{
	// do nothing no preset for this class
}


// --------------------------------------------------------


/// makes increment change (if it can)
/// must be called once for every loop
void IncDecayCumInfinite::updateStep()
{
	_cumulative += step;
	_step *= _decayFactor;
}

/// returns the current step value
double IncDecayCumInfinite::getStep()
{
	return _cumulative;
}

/// presets the cumulative value
void IncDecayCumInfinite::presetCumulative( double preset )
{
	if( preset < _min || preset > _max)
	{
		// throw
	}
	 _cumulative = preset;
}

IncDecayCumInfinite::IncDecayCumInfinite( double step , double decayFactor )
{
	_step = step;
	_decayFactor = decayFactor
}



// --------------------------------------------------------



/// makes increment change (if it can)
/// must be called once for every loop
void IncDecayCumReset::updateStep()
{
	_cumulative += step;
	_step *= _decayFactor;
	if (_cumulative >= _max) {
		_cumulative = _min + (_cumulative - _max);
	} else if (_cumulative <= _min) {
		_cumulative = _max - (_cumulative + _min);
	}
}

/// returns the minimum value the step/increment/cumulative can be
double IncDecayCumReset::getMin()
{
	return _min;
}

/// returns the maximum value the step/increment/cumulative can be
double IncDecayCumReset::getMax()
{
	return _min;
}

void IncDecayCumReset::_fixMinMax()
{
	if( _min > _max ) {
		tmp = _min;
		_min = _max;
		_max = tmp;
	}
}

IncDecayCumReset::IncDecayCumReset( double step , double decayFactor , double min , double max )
{
	double tmp;
	_step = step;
	_decayFactor = decayFactor;
	_min= min;
	_max = max;
	this->_fixMinMax();
}


// --------------------------------------------------------

/// makes increment change (if it can)
/// must be called once for every loop
void IncDecayCumOscillate::updateStep()
{
	_cumulative += step;
	_step *= _decayFactor;
	if (_cumulative >= _max) {
		_step = -_step;
		_cumulative = _max - (_cumulative - _max);
	} else if (_cumulative <= _min) {
		_step = -_step;
		_cumulative = _min + (_cumulative + _min);
	}
}







//  END:  IncrementDecay
// ==================================================================
// START: IncrementEase







//  END:  IncrementEase
// ==================================================================
