<?php

interface boomInterface
{
	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY );

	public function getX();

	public function getY();
}


abstract class boomAbstract implements boomInterface
{
	protected $_firstBoom;
	protected $_secondBoom;
	protected $_endX = 0;
	protected $_endY = 0;

	public function getX()
	{
		return $this->_endX;
	}

	public function getY()
	{
		return $this->_endY;
	}
}


/**
 * @class	straightBoom the output of the circle managers provide
 *			the base points for each arm  setEndPoint() gives the
 *			third point on the triangle
 */
class straightBoom extends boomAbstract
{
	/**
	 * @method straightBoom()
	 *
	 * @param firstBoom  provides the offset and length for the
	 *		                          first boom
	 * @param secondBoom provides the offset and length for the
	 *		                          second boom
	 */
	public function __construct( stepper $firstBoom , stepper $secondBoom ) {
		$this->_firstBoom = $firstBoom;
		$this->_secondBoom = $secondBoom;
	}

	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY )
	{
		if( !is_numeric($firstOriginX) || !is_numeric($firstOriginY) || !is_numeric($secondOriginX) || !is_numeric($secondOriginY) )
		{
			//throw
		}
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
class simpleScissorBoom extends boomAbstract
{
	private $_pivotPosition = null;


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
	public function __construct(  stepper $firstBoom , stepper $secondBoom , stepper $pivotPosition ) {
		$this->_firstBoom = $firstBoom;
		$this->_secondBoom = $secondBoom;

		if( $pivotPosition->withinMinMax( 0 , 1 ) == false )
		{
			// throw error
		}
		$this->_pivotPosition = $pivotPosition;
	}

	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY )
	{
		if( !is_numeric($firstOriginX) || !is_numeric($firstOriginY) || !is_numeric($secondOriginX) || !is_numeric($secondOriginY) )
		{
			//throw
		}
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
class asymetricalScissorBoom extends boomAbstract
{
	/**
	 * @method asymetricalScissorBoom()
	 *
	 * @param firstBoom          provides the offset and length for the
	 *		                                  boom
	 * @param secondBoom         provides the offset and length for the
	 *		                                  boom
	 * @param pivotFirstPosition at       what point along each boom
	 *		                                  they connects to each other then spread appart
	 *		                                  again.
	 *		                                  The output of pivotPosition->getStep() be between
	 *		                                  zero and one
	 */
	public function __construct(  stepper $firstBoom , stepper $secondBoom , stepper $pivotPosition ) {
		$this->_firstBoom = $firstBoom;
		$this->_secondBoom = $secondBoom;

		if( $ivotPosition->withinMinMax( 0 , 1 ) == false )
		{
			// throw error
		}
		$this->_pivotPosition = $pivotPosition;
	}
	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY )
	{
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
class whackyScissorBoom extends boomAbstract
{
	private $_pivotFirstPosition;
	private $_pivotSecondPosition;

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
	public function __construct( stepper $firstBoom , stepper $secondBoom , stepper $pivotFirstPosition , stepper $pivotSecondPosition )
	{
		$this->_firstBoom = $firstBoom;
		$this->_secondBoom = $secondBoom;

		if( $pivotFirstPosition->withinMinMax( 0 , 1 ) == false )
		{
			// throw error
		}
		$this->_pivotFirstPosition = $pivotFirstPosition;

		if( $pivotSecondPosition->withinMinMax( 0 , 1 ) == false )
		{
			// throw error
		}
		$this->_pivotSecondPosition = $pivotSecondPosition;
	}

	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY )
	{
		if( !is_numeric($firstOriginX) || !is_numeric($firstOriginY) || !is_numeric($secondOriginX) || !is_numeric($secondOriginY) )
		{
			//throw
		}
		// do the actual calculations
	}
}


/**
 * @class	Tboom works on the principle that that the circles are
 *			connected by a straight line and the boom comes off that
 *			line at a given offset
 */
class Tboom extends boomAbstract
{
	private $_boomOffset;

	/**
	 * @method Tboom()
	 *
	 * @param firstBoom  provides the offset for the first boom
	 *		                          and the length for both booms
	 * @param secondBoom only     provides the offset the length is
	 *		                          ignored
	 * @param boomOffset at       what point along the base line the
	 *		                          boom projects from
	 *		                          The output of boomOffset->getStep() be between zero
	 *		                          and one
	 */
	public function __construct(  stepper $firstBoom , stepper $secondBoom , stepper $boomOffset )
	{
		$this->_firstBoom = $firstBoom;
		$this->_secondBoom = $secondBoom;

		if( $boomOffset->withinMinMax( 0 , 1 ) == false ) {
			// throw error
		}
		$this->_boomOffset = $boomOffset;
	}

	public function setEndPoint( $firstOriginX , $firstOriginY , $secondOriginX , $secondOriginY )
	{
		if( !is_numeric($firstOriginX) || !is_numeric($firstOriginY) || !is_numeric($secondOriginX) || !is_numeric($secondOriginY) )
		{
			//throw
		}
		// do the actual calculations
	}
}

