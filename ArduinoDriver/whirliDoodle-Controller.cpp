class whirliDoodleController : MovementInterface {
	private:
		unsigned int _steps = 0;
		circleManager _firstCircle;
		circleManager _secondCircle;
		circleShape	_tableRotator;

	public:
		whirliDoodleController( circleManager firstCircle , circleManager secondCircle , MovementController tableRotator ) {
			_firstCircle = firstCircle;
			_secondCircle = secondCircle;
			_tableRotator = tableRotator;
		}

		void move() {
			_steps += 1;
			_firstCircle->move();
			_secondCircle->move();
			_tableRotator->move();
		}

		unsigned int getSteps() {
			return _steps;
		}

}