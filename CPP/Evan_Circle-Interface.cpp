// Generic interface for both circleShape and circleManager objects
class circleInterface
{
	public:
		/**
		 * @method	initXY() puts the _radiusPointX &
		 *			_radiusPointY at their initial location
		 *
		 * @param x (12 O'clock) coordinate of the X radius point to
		 *			be used as the starting point from which, the
		 *			radius is rotated to the specified angle
		 *
		 * @param y (12 O'clock) coordinate of the Y radius point to
		 *			be used as the starting point from which, the
		 *			radius is rotated to the specified angle
		 */
		virtual void initXY( double x , double y );

		/**
		 * @method move() move the radiusPoint to a new location
		 */
		virtual void move();

		/**
		 * @method rotateXY() move the radiusPoint to a new location
		 */
		virtual void rotateXY( double x , double y );

		/**
		 * @method	setOriginXY() sets the _originX & _originY for
		 *			the circle object
		 */
		virtual void setOriginXY( double x , double y );

		/**
		 * @method	getX() returns the final _radiusPointX in the
		 *			stack (the one that will be used as the origin of
		 *			one drawing arm)
		 */
		virtual double getX();

		/**
		 * @method	getY() like getX() but for the Y value
		 */
		virtual double getY();

		/**
		 * @method	getOriginX() returns the _originX of this
		 *			circleManager object
		 */
		virtual double getOriginX();

		/**
		 * @method	getOriginY() returns the _originY of this
		 *			circleManager object
		 */
		virtual double getOriginY();
}

class abstractCircle : circleInterface {

	private:
		double _originX;
		double _originY;

		double _radiusPointX;
		double _radiusPointY;

	public:
		/**
		 * @method	setOriginXY() sets the _originX & _originY for
		 *			the circle object
		 */
		void setOriginXY( double x , double y ) {
			_originX = x;
			_originY = y;
		}

		/**
		 * @method	getX() returns the final _radiusPointX in the
		 *			stack (the one that will be used as the origin of
		 *			one drawing arm)
		 */
		double getX() {
			return _radiusPointX;
		}

		/**
		 * @method	getY() like getX() but for the Y value
		 */
		double getY() {
			return _radiusPointY;
		}

		/**
		 * @method	getOriginX() returns the _originX of this
		 *			circleManager object
		 */
		double getOriginX() {
			return _originX;
		}

		/**
		 * @method	getOriginY() returns the _originY of this
		 *			circleManager object
		 */
		double getOriginY() {
			return _originY;
		}
}