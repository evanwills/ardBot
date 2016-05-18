
// ==================================================================
// START: stepper

class stepperInterface
{
	public:
		virtual void updateStep();
		virtual double getStep() = 0;
		virtual double getCumulativeStep() = 0;
		virtual double getLastStep() = 0;
//		virtual void preLoop(int loops);
		virtual double getMin();
		virtual double getMax();
		virtual void setCumlativeMinMax( double min , double max );
		virtual bool withinMinMax( double min , double max );
}


class stepper : stepperInterface
{
	protected:
		double _step;
		double _min;
		double _max;
		double _lastStep;
		double _stepCumulative;
		double _cumulativeMin;
		double _cumulativeMax;
		bool _doCumulative = false;
		bool _doCumulativeMinMax = false;
		virtual void _updateStep();
		virtual void _updateStepAcumulate();
		virtual void _updateStepAcumulateResetAtMax();

	public:
		double updateStep() {
			if( _doCumulative == true ) {
				if( _doCumulativeMinMax == true ) {
					return _updateStepAcumulateResetAtMax()
				} else {
					return _updateStepAcumulate()
				}
			} else {
				return _updateStep();
			}
		}
		double getStep() {
			if( _doCumulative == false ) {
				return _step;
			} else {
				return _stepCumulative;
			}
		}
		double getCumulativeStep() {
			return _stepCumulative;
		}

		double getLastStep() {
			return _lastStep;
		}
//		virtual void preLoop(int loops);

		double getMin() {
			return _min;
		}

		double getMax() {
			return _max;
		}

		void setCumlativeMinMax( double min , double max ) {
			_doCumulative = true;
			if( min < max ) {
				_cumulativeMin = min;
				_cumulativeMax = max;
				_doCumulativeMinMax = true;
			}
		}

		bool withinMinMax( double min , double max ) {
			double tmp;
			if( min > max ) {
				tmp = min;
				min = max;
				max = tmp;
			}

			if( _step > max || _step < min || _min < min || _max >= max || _max =< min ) {
				return false;
			}
			return true;
		}
}

class stepperFixed : stepper {
	protected:
		void _updateStep() {
			// do nothing
			return _step;
		}

		void _updateStepAcumulate() {
			_stepCumulative += _step;
			return _stepCumulative;
		}

		double _updateStepAcumulateResetAtMax() {
			_stepCumulative += _step;
			if( _stepCumulative >= _CumulativeMax ) {
				_stepCumulative = _cumulativeMin + ( _stepCumulative - _cumulativeMax );
			}
			return _stepCumulative;
		}

	public:
		stepperFixed( double step ) {
			_step = step;
			_min = step;
			_max = step;
		}
}

class stepperLinier : stepper {
	protected:
		double _increment;
		double _doMinMax(double input) {
			if( input > _max ) {
				// bounce _step off max
				_step = _max - ( input - _max );
				_increment = -_increment;
			} else if( input < min ) {
				// bounce _step off min
				_step = _min + ( _min - input );
				_increment = -_increment;
			}
		}

		double _updateStep() {
			_lastStep = _step;
			_step += _increment;
			return _doMinMax( _step );
		}

		double _updateStepAcumulate() {
			_lastStep = _step;
			_step += _increment;
			_stepCumulative += _step;

			return _doMinMax( _stepCumulative );
		}

		double _updateStepAcumulateResetAtMax() {
			_stepCumulative += _step;
			if( _stepCumulative > _CumulativeMax ) {
				_stepCumulative = _cumulativeMin + ( _stepCumulative - _cumulativeMax );
			}
			return _stepCumulative;
		}

	public:

		stepperLinier( double step , double increment , double min , double max ) {
			if( min > max ) {
				_min = max;
				_max = min;
			} else {
				_max = max;
				_min = min;
			}
			_step = step;
			_increment = increment;
			getStep();
		}

//		void preLoop(int loops) {
//			double step = _step;
//			if( loops < 0 ) {
//				step = -step;
//			}
//
//			for( loops ; loops >= 0 ; loops -= 1 ) {
//				getStep();
//			}
//		}
}

class stepperCircular : stepper {
}

class stepperEliptic : stepper {
}

//  END:  stepper
// ==================================================================
