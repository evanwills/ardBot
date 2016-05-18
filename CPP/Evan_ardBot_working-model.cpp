class dm3WorkingModel {
	private:
		unsigned int _width;
		unsigned int _height;
		boomIntegrator _booms;
		circleManager _firstCircle;
		circleManager _secondCircle;
		circleShape	_tableRotator;
		double _x;
		double _y;

	public:
		dm3WorkingModel( unsigned int width , unsigned int height , boomIntegrator booms , circleManager firstCircle , circleManager secondCircle , circleShape	tableRotator ) {
			_width = width;
			_height = height;
			_booms = booms;

			firstCircle->fixDepth();
			_firstCircle = firstCircle;

			secondCircle->fixDepth();
			_secondCircle = secondCircle;
			_tableRotator = tableRotator;
		}

		void rotate() {
			double _firstX = 0;
			double _firstY = 0;
			double _secondX = 0;
			double _secondY = 0;

			_firstCircle->rotate();
			_secondCircle->rotate();
			_booms->setEndPoint( _firstCircle->getX() , _firstCircle->getY() , _secondCircle->getX() , _secondCircle->getY() );
			_tableRotator->rotate( _booms->getX() , _booms->getY() );

			_x = _tableRotator->getX();
			_y = _tableRotator->getY();
		}

		double getX() {
			return _x;
		}

		double getY() {
			return _y;
		}

}