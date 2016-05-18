class boomInterface
{
	public:
		virtual void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY );

		virtual double getX();

		virtual double getY();
}


class boomAbstract : boomInterface {
	private:
		stepper * _firstBoom;
		stepper * _secondBoom;
		double _endX = 0;
		double _endY = 0;

	public:
		double getX() {
			return _endX;
		}

		double getY() {
			return _endY;
		}
}


/**
 * @class	straightBoom the output of the circle managers provide
 *			the base points for each arm  setEndPoint() gives the
 *			third point on the triangle
 */
class straightBoom : boomAbstract
{
	private:
		stepper * _firstBoom;
		stepper * _secondBoom;

	public:
		/**
		 * @method straightBoom()
		 *
		 * @param firstBoom provides the offset and length for the
		 *		  first boom
		 * @param secondBoom provides the offset and length for the
		 *		  second boom
		 */
		straightBoom( stepper * firstBoom , stepper * secondBoom ) {
			_firstBoom = firstBoom;
			_secondBoom = secondBoom;
		}
		void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY ) {
			// do the actual calculations
		}
}


/**
 * @class	simpleScissorBoom is a symetrical scissor where the pivot
 *			position is the same for both booms. As the base points
 *			for the booms get further appart the length of the boom
 *			shortens and likewise, as they get closer together the
 *			boom lengthens.
 *
 * NOTE: the distance from the pivotPoint to the end of the boom is
 *		 mirrored to join the booms back together
 */
class simpleScissorBoom : boomAbstract
{
	private:
		stepper * _pivotPosition;

	public:
		/**
		 * @method simpleScissorBoom()
		 *
		 * @param firstBoom provides the offset for the first boom
		 *		  and the length for both booms
		 * @param secondBoom only provides the offset the length is
		 *		  ignored
		 * @param pivotPosition at what point along the boom to the
		 *		  two booms connect then spread appart again.
		 *		  The output of pivotPosition->getStep() be between
		 *		  zero and one
		 */
		simpleScissorBoom(  stepper * firstBoom , stepper * secondBoom , stepper * pivotPosition ) {
			_firstBoom = firstBoom;
			_secondBoom = secondBoom;
			if( pivotPosition->withinMinMax( 0 , 1 ) == false ) {
				// throw error
			}
			_pivotPosition = pivotPosition;
		}
		void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY ) {
			// do the actual calculations
		}
}


/**
 * @class	asymetricalScissorBoom is an asymetrical scissor where
 *			the pivot position is the same relative to the length of
 *			each boom but the booms can be different sizes.
 *
 * As the base points for the booms get further appart the length of
 * the boom shortens and likewise, as they get closer together the
 * boom lengthens.
 *
 * NOTE: the distance from the pivotPoint to the end of the boom is
 *		 mirrored to join the booms back together
 */
class asymetricalScissorBoom : boomAbstract
{
	public:
		/**
		 * @method asymetricalScissorBoom()
		 *
		 * @param firstBoom provides the offset and length for the
		 *		  boom
		 * @param secondBoom provides the offset and length for the
		 *		  boom
		 * @param pivotFirstPosition at what point along each boom
		 *		  they connects to each other then spread appart
		 *		  again.
		 *		  The output of pivotPosition->getStep() be between
		 *		  zero and one
		 */
		asymetricalScissorBoom(  stepper * firstBoom , stepper * secondBoom , stepper * pivotPosition ) {
			_firstBoom = firstBoom;
			_secondBoom = secondBoom;

			if( pivotPosition->withinMinMax( 0 , 1 ) == false ) {
				// throw error
			}
			_pivotPosition = pivotPosition;
		}
		void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY ) {
			// do the actual calculations
		}
}


/**
 * @class	whackyScissorBoom is an asymetrical scissor where the
 *			booms can be different sizes and the pivotPoints for each
 *			boom can also be different
 *
 * As the base points for the booms get further appart the length of
 * the boom shortens and likewise, as they get closer together the
 * boom lengthens.
 *
 * NOTE: the distance from the pivotPoint to the end of the boom is
 *		 mirrored to join the booms back together
 */
class whackyScissorBoom : boomAbstract
{
	private:
		stepper * _pivotFirstPosition;
		stepper * _pivotSecondPosition;
	public:
		/**
		 * @method whackyScissorBoom()
		 *
		 * @param firstBoom provides the offset for the first boom
		 *		  and the length for both booms
		 * @param secondBoom only provides the offset the length is
		 *		  ignored
		 * @param pivotFirstPosition at what point along the second
		 *		  boom it connects to the first boom then spread
		 *		  appart again.
		 *		  The output of pivotFirstPosition->getStep() be
		 *		  between zero and one
		 * @param pivotSecondPosition at what point along the second
		 *		  boom it connects to the first boom then spread
		 *		  appart again.
		 *		  The output of pivotSecondPosition->getStep() be
		 *		  between zero and one
		 */
		whackyScissorBoom( stepper * firstBoom , stepper * secondBoom , stepper * pivotFirstPosition , stepper * pivotSecondPosition ) {
			_firstBoom = firstBoom;
			_secondBoom = secondBoom;

			if( pivotFirstPosition->withinMinMax( 0 , 1 ) == false ) {
				// throw error
			}
			_pivotFirstPosition = pivotFirstPosition;
			if( pivotSecondPosition->withinMinMax( 0 , 1 ) == false ) {
				// throw error
			}
			_pivotSecondPosition = pivotSecondPosition;
		}
		void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY ) {
			// do the actual calculations
		}
}


/**
 * @class	Tboom works on the principle that that the circles are
 *			connected by a straight line and the boom comes off that
 *			line at a given offset
 */
class Tboom : boomAbstract
{
	private:
		stepper * _boomOffset;

	public:
		/**
		 * @method Tboom()
		 *
		 * @param firstBoom provides the offset for the first boom
		 *		  and the length for both booms
		 * @param secondBoom only provides the offset the length is
		 *		  ignored
		 * @param boomOffset at what point along the base line the
		 *		  boom projects from
		 *		  The output of boomOffset->getStep() be between zero
		 *		  and one
		 */
		Tboom(  stepper * firstBoom , stepper * secondBoom , stepper * boomOffset ) {
			_firstBoom = firstBoom;
			_secondBoom = secondBoom;

			if( boomOffset->withinMinMax( 0 , 1 ) == false ) {
				// throw error
			}
			_boomOffset = boomOffset;
		}

		void setEndPoint( double firstOriginX , double firstOriginY , double secondOriginX , double secondOriginY ) {
			// do the actual calculations
		}
}

