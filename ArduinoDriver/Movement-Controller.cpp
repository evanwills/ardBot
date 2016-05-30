
class MovementController : MovementControllerInterface
{
	private:
		incrementManager * _step;
		unsigned int _pin1 = 0;
		unsigned int _pin2 = 0;
		unsigned int _pin3 = 0;
		double _stepsToMax = 0;

		void _move( double steps ) {
			// work out how many steps to turn the motro
			// send signal to pins.
		}

	public:
		MovementController( incrementManager * step , unsigned int pin1 , unsigned int pin2 , unsigned int pin3 , double stepsToMax ) {
			_step = step;
			_pin1 = pin1;
			_pin2 = pin2;
			_pin3 = pin3;
			_stepsToMax = stepsToMax;
		}

		void move() {
			_step->updateStep();
			_move( _angleStep->getStep() );
		}

		void setInitialState( double input ) {
			// do some validation on input
			// fix input if less than -360 or > 360
			_move( input );
		}
}
