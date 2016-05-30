// IncrementManager fixed needs some rethinking I'm pretty sure the cumulative stuff is unnecessary


class IncrementManager {
	public:
		virtual void updateStep();
		virtual double getStep();
		virtual double getIncrement();
		virtual double getLastStep();
		virtual double getMin();
		virtual double getMax();
		virtual bool withinMinMax(double min, double max);
}



//  END:  IncrementManager (interface)
// ==================================================================
// START: AbstractIncrement

class AbstractIncrement : IncrementManager {
	protected:
		double _step = 0;
		double _min = 0;
		double _max = 0;
		double _lastStep = 0;
		double _increment = 0;
		double _cumulative = 0;

	public:
		void updateStep() {
			_cumulative += _step;
		}

		double getStep() {
			return _step;
		}

		double getIncrement() {
			return _increment;
		}

		double getLastStep() {
			return _lastStep;
		}

		double getMin() {
			return _min;
		}

		double getMax() {
			return _max;
		}

		bool withinMinMax(double min, double max) {
			double tmp;

			if( min > max ) {
				tmp = min;
				min = max;
				max = tmp;
			}

			if( _step > max || _step < min || _min < min || _max >= max || _max <= min ) {
				return false;
			}
			return true;
		}

}



//  END:  AbstractIncrement
// ==================================================================
// START: IncrementFixed






class IncrementFixed : AbstractIncrement {
	public
		IncrementFixed( double step ) {
			_step = step;
			_lastStep = step;
			_min = step;
			_max = step;
		}
}








//  END:  IncrementFixed
// ==================================================================
// START: IncrementDecay





/**
 * supplies an ever decreasing step
 * @param {double} step        the value that will be returned
 * @param {double} decayFactor a number between 0 and 1
 */
class IncrementDecay : AbstractIncrement {
	protected:
		_decayFactor = 0;

	public:
		IncrementDecay( double step, double decayFactor ) {
			if( decayFactor > 1 || decayFactor <= 0 ) {
				// throw error
			}
			_decayFactor = decayFactor;
			_step = step;
			_max = step;
		}
		void updateStep() {
			'use strict';
			_lastStep = _step;
			_step *= _decayFactor;
		}
}







//  END:  IncrementFixed
// ==================================================================
// START: IncrementOscillate






class IncrementOscillate : AbstractIncrement {
	protected:
		char _minMaxMode = 'linier';
		bool _doCumulative = false;
		void _doMinMaxLinier() {

			_step += _increment;

			if (_step > _max) {
				// bounce _step off max
				_step = _max - (_step - _max);
				_increment = -_increment;
			} else if (_step < _min) {
				// bounce _step off min
				_step = _min + (_min - _step);
				_increment = -_increment;
			}
		}

		void _doMinMaxReset() {
			_step += _increment;
			if (_step > _max) {
				// bounce _step off max
				_step = _min + (_step - _max);
			}
		}

		void _doMinMaxCurve() {
			// calculate the X coordinate on a curve at a given angle
		}


	public:
		IncrementOscillate( double step, double increment, double min, double max ) {
			if (min > max) {
				_min = max;
				_max = min;
			} else {
				_max = max;
				_min = min;
			}
			_step = step;
			_increment = increment;
		}

		void doMinMax() {
			if( _minMaxMode == 'linier' ) {
				_doMinMaxLinier();
			}
			else  if( _minMaxMode == 'reset' ) {
				_doMinMaxReset();
			} else {
				_doMinMaxCurve();
			}
		}

		bool setIncrementMode( char mode ) {
			if (mode == 'linier' || mode == 'reset' || mode == 'curve') {
				_minMaxMode = mode;
				return true;
			} else {
				// throw 'IncrementOscillate::setIncrementMode() expects only parameter to be a "linier", "reset" or "curve". "' + mode + '" given.'};
				return false;
			}
		}

		void setDoCumulative( bool mode ) {
			_doCumulative = mode;
		}
}



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
