// Generic interface for both circleShape and circleManager objects
class MovementInterface
{
	public:

		/**
		 * @method move() move the radiusPoint to a new location
		 */
		virtual void move();
}


class MovementControllerInterface : MovementInterface
{
	public:

		/**
		 * @method move() move the radiusPoint to a new location
		 */
		virtual void setInitialState( double input );
}