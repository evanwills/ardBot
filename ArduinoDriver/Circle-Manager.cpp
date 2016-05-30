// ==================================================================
// How it should work:
//		1.
//		2.	for each child,
//		2.a.	get radiusPointX & radiusPointY
//		2.b.	rotate radiusPointX & radiusPointY around current
//				orginX & orginY
//		2.c.	send new radiusPointX & radiusPointY back to child
//		3.	repeat steps 1 - 3 for each child

// ==================================================================
// START: circleManager family

// circleManager class objects manage recursively rotating the
// radiusPointX & Y of each circle in the stack relative to the
// origin of the current circle.

// Not sure how this needs to be coded but... the _radiusPointX,
// _circle->_radiusPointX, _childCircle->_originX and
// _childCircle->_circle->_originX should all share the same pointer.
// The same goes for the _radiusPointY

class circleManager : MovementInterface
{
	private:
		circleShapeInterface _circle;
		radiusInterface _radius;

	public:
		/**
		 * @method	setChildCircle() adds another circleManager
		 *			object to the top of the stack
		 */
		virtual void setChildCircle( circleManager childCircle );


}



class singleCircle : circleManager
{

	public:
		singleCircleManager( MovementController circle , MovementController radius ) {
			_circle = circle;
			_radius = radius;
		}

		/**
		 * @method	move() rotates its own radius points
		 */
		void move() {
			_circle->move();
			_radius->move();
		}

		void setChildCircle( circleManager * childCircle ) {
			// do nothing
		}

		void setInitialState( double input ) {
			// do nothing
		}

}

class multiCircle : singleCircle
{
	private:
		circleManager * _childCircle;

	public:

		void setChildCircle( circleManager * childCircle ) {
			_depth += 1;
			if( _childCircle ===  null ) {
				_childCircle = childCircle;
				_childCircle->initXY( _radiusPointX , _radiusPointY );
			} else {
				_childCircle->setChildCircle(childCircle);
			}
		}

		/**
		 * @method	move() rotates its own radius points as
		 *			well as those of all its children. It also sets
		 *			the _originX & _originY of its direct child
		 *			manager
		 */
		void move() {
			_circle->move();
			_radius->move();

			if( _childCircle ===  null ) {
				_childCircle->move();
			}
		}
}

//  END: circleManager
// ==================================================================
