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

class circleManager : abstractCircle
{
	private:
		circleType * _circle;
		unsigned int _depth = 0;

	public:

		/**
		 * @method	depthOK() is used to varify that the stack of
		 *			circles is OK. By OK, I mean that the
		 *					last circle is a singleCircle object and
		 *					that no multiCircle objects were added
		 *					after it.
		 *
		 * This method should be called after all the circleManager
		 * objects have been initialised.
		 *
		 * NOTE: Because of the way multiCircle is setup, it should
		 *		 be OK to use a stack even if the output of depthOK()
		 *		 is FALSE.
		 */
		virtual bool depthOK( bool fix ) = 0;

		virtual void fixDepth( );

		/**
		 * @method	setChildCircle() adds another circleManager
		 *			object to the top of the stack
		 */
		virtual void setChildCircle( circleManager childCircle );

		/**
		 * @method	setRadiusPointXY() sets the radius point at a
		 *			given depth after the XY points have been rotated
		 *			by lower circleManager object
		 *
		 * @param [double] x the X coordinate of the radius point
		 * @param [double] y the Y coordinate of the radius point
		 * @param [unsigned in] depth how far from the top of the
		 *			stack the radius point should be set
		 */
		virtual void setRadiusPointXY( double x , double y , unsigned int depth );

		/**
		 * @method	getCircleShape() returns the circleShape object
		 *			used at a given depth;
		 */
		virtual circleShape * getCircleShape( unsigned int depth );

		/**
		 * @method getDepth() returns the level in the stack that the
		 *					circle is at
		 *					e.g. if there are 5 circles in the stack
		 *						 and this one was added fourth, it's
		 *						 depth would be 1
		 */
		virtual unsigned int getDepth() = 0;

		/**
		 * @method	getRadiusPointX() returns the _radiusPointX
		 *			coordinate at a given depth
		 */
		virtual double getRadiusPointX( unsigned int depth ) = 0;

		/**
		 * @method	getRadiusPointY() like getRadiusPointX() but for
		 *			the Y value
		 */
		virtual double getRadiusPointY( unsigned int depth ) = 0;

}



class singleCircle : circleManager
{

	public:
		singleCircleManager( circleType circle ) {
			_circle = circle;
		}

		double getDepth() {
			return depth;
		}

		bool depthOK() {
			return true;
		}

		bool fixDepth() {
		}

		void setChildCircle( circleManager * childCircle ) {
			// do nothing singleCirclePoint objects have no child
		}

		void setRadiusPointXY( double x , double y , unsigned int depth ) {
			_radiusPointX = x;
			_radiusPointY = y;
		}

		void setOriginXY( double x , double y ) {
			_OriginX = x;
			_OriginY = y;
			_circle->setOriginXY(x,y);
		}

		void initXY( double x , double y ) {
			double pointX = 0;
			double pointY = 0;
			setOriginXY( x , y );
			_circle->initXY( x , y );
			_radiusPointX = _circle->getX();
			_radiusPointY = _circle->getY();
		}

		/**
		 * @method	move() rotates its own radius points
		 */
		void move() {
			_circle->setOriginXY( _originX , _originY );
			_circle->rotateXY( _radiusPointX , _radiusPointY );
			_radiusPointX = _circle->getX();
			_radiusPointY = _circle->getY();
		}

		double getAngleStep( unsigned int depth ) {
			return _circle->getAngleStep(depth);
		}

		double getRadiusPointX( unsigned int depth ) {
			return _radiusPointX;
		}

		double getRadiusPointY( unsigned int depth ) {
			return _radiusPointY;
		}

		unsigned int getDepth() {
			return _depth;
		}


};

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
			unsigned int tmpDepth = _depth;
			double radiusPointX = 0;
			double radiusPointY = 0;

			_circle->setOriginXY( _originX , _originY );

			for( tmpDepth ; tmpDepth >= 0 ; tmpDepth -= 1 ) {

				radiusPointX = childCircle->getRadiusPointX( tmpDepth );
				radiusPointY = childCircle->getRadiusPointY( tmpDepth );

				_circle->rotateXY( radiusPointX , radiusPointY );

				childCircle->setRadiusPointXY( _circle->getX() , _circle->getY() , tmpDepth );
			}

			_circle->rotate();

			_radiusPointX = _circle->getX();
			_radiusPointY = _circle->getY();

			childCircle->setOriginXY( _radiusPointX , _radiusPointY );
			childCircle->rotate();
		}


		/**
		 * @method depthOK() checks whether the hierarchy of nested
		 *			circles is correct
		 */
		bool depthOK( ) {
			bool output = false;
			if( _childCircle == null ) {
				if( _depth == 0 ) {
					output true;
				}
			} else if( _childCircle->getDepth() + 1 == _depth ) {
				output = true;
			}
			// this looks OK lets see whether the child is OK
			return output;
		}


		/**
		 * @method fixDepth() makes sure the hierarchy of nested
		 *			circles is correct
		 */
		void fixDepth( bool fix) {
			if( _childCircle == null ){
				_depth = 0;
			} else {
				_childCircle->fixDepth();
				_depth = _childCircle->getDepth() + 1;
			}
		}

		void setRadiusPointXY( double x , double y , unsigned int depth ) {
			depth -= 1;
			if( depth == _depth ) {
				_radiusPointX = x;
				_radiusPointY = y;
				// the radius point of this circle is the origin of the child
				_childCircle->setOriginXY( x , y );
			} else {
				_childCircle->setRadiusPointXY( x , y , depth );
			}
		}

		double getAngleStep( unsigned int depth ) {
			depth -= 1;
			if( depth == _depth ) {
				return _circle->getAngleStep();
			} else {
				return _childCircle->getAngleStep(depth);
			}
		}


		double getRadiusPointX( unsigned int depth ) {
			depth -= 1;
			if( depth == _depth || _childCircle == null ) {
				return _radiusPointX;
			} else {
				return _childCircle->getRadiusPointX( depth );
			}
		}

		double getRadiusPointY( unsigned int depth ) {
			depth -= 1;
			if( depth == _depth || _childCircle == null ) {
				return _radiusPointY;
			} else {
				return _childCircle->getRadiusPointY( depth );
			}
		}


		double getX() {
			if( _childCircle == null ) {
				return _radiusPointX;
			} else {
				return _childCircle->getX();
			}
		}

		double getY() {
			if( _childCircle == null ) {
				return _radiusPointY;
			} else {
				return _childCircle->getY();
			}
		}
}

//  END: circleManager
// ==================================================================
