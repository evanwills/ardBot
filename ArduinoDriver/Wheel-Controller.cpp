
class wheelController : MovementControllerInterface
{
	private:
		incrementManager * _angleStep;
		unsigned int _pin1 = 0;
		unsigned int _pin2 = 0;
		unsigned int _pin3 = 0;
		double _stepsInRevolution = 0;

		void _rotate( double angle ) {
			// work out how many steps to turn the motro
			// send signal to pins.
		}

	public:
		wheelController( incrementManager * angleStep , unsigned int pin1 , unsigned int pin2 , unsigned int pin3 , double stepsInRevolution ) {
			_angleStep = angleStep;
			_pin1 = pin1;
			_pin2 = pin2;
			_pin3 = pin3;
			_stepsInRevolution = stepsInRevolution;
		}

		void move() {
			_angleStep->updateStep();
			_rotate( _angleStep->getStep() );
		}

		void setInitialState( double input ) {
			// do some validation on input
			// fix input if less than -360 or > 360
			_rotate( input );
		}
}
