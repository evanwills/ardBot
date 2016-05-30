

// ==================================================================
// START: circleType family

class circleShapeInterface : abstractCircle // interface
{
	public:
		/**
		 * @method	setRadiusPointXY() sets the _radiusPOintX &
		 *			 for the circle object
		 */
		virtual void setRadiusPointXY( double x , double y );

		virtual void rotateXY( double x , double y );

		virtual double getRadiusPointX();

		virtual double getRadiusPointY();
}


class abstractCircleShape : circleShapeInterface // interface
{
	protected:
		stepper * _angleStep;
		double _currentAngle;
		double _initialAngle;
		double _tmpAngle;
		double _tmpX;
		double _tmpY;

	public:

		double getRadiusPointX() {
			return _tmpX;
		}

		double getRadiusPointY() {
			return _tmpY;
		}

		double degToRad(input) {
			return input / 57.2957795;
		}

		double radToDeg(input) {
			return input * 57.2957795;
		}
}

class circle : circleShape
{
	private:
		stepper * _radius;
		double _getRadius( double X , double Y ) {
			return
		}
		double _getAngle( radius ) {

		}

	public:
		circle( double initalAngle , stepper * angleStep , stepper * radius ) {
			_radius = radius;
			_initialAngle = initialAngle;
			_angleStep = angleStep;
		}

		void rotateXY( double x , double y ) {
			double relativeX = x - _orginX;
			double relativeY = y - _orginY;
			double radius = sqrt( sq(relativeX) + sq(relativeY) );
			double _tmpAngle = sin( relativeY / radius ) + _angleStep->getStep();

			double newAngle =  degToRad( _tmpAngle );

			_tmpX = (radius * arccos(newAngle) ) + _originX;
			_tmpX = (radius * arcsin(newAngle) ) + _originY;
		}

		void move() {
			_angleStep->updateStep();
			_radius->updateStep();
			rotateXY( _radiusPointX , _radiusPointY );
			_radiusPointX = _tmpX;
			_radiusPointY = _tmpY;
			_currentAngle = _tmpAngle;
		}



		void initXY( double originX , double originY ) {
			setOriginXY( originX , originY );
		}
}

class ellipse : circleShape
{
	private:
		stepper * _radiusX;
		stepper * _radiusY;
		stepper * _radiusOffsetX;
		stepper * _radiusOffsetY;
	public:
		circle( double initalAngle , stepper * angleStep ,  stepper * radiusX , stepper * radiusY , stepper * radiusOffsetX , stepper * radiusOffsetY ) {
			_initialAngle = initialAngle;
			_angleStep = angleStep;
			_radiusX = radiusX;
			_radiusY = radiusY;
			_radiusoffsetX = radiusoffsetX;
			_radiusoffsetY = radiusoffsetY;
		}

		void move( ) {
		}

		void initXY( double originX , double originY ) {
			setOriginXY( originX, originY );
		}
}

//  END: circleType
// ==================================================================

